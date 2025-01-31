from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from azure.storage.blob import BlobServiceClient
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import UserSurvey
from .serializers import UserSurveySerializer
import os
import uuid

class UserSurveyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Отримати дані анкети"""
        try:
            survey = UserSurvey.objects.get(user=request.user)
            serializer = UserSurveySerializer(survey)
            return Response(serializer.data)
        except UserSurvey.DoesNotExist:
            return Response({"detail": "Анкета не знайдена"}, status=404)

    def put(self, request):
        """Оновити анкету"""
        survey, created = UserSurvey.objects.get_or_create(user=request.user)
        serializer = UserSurveySerializer(survey, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class UploadPhotoView(APIView):
    """Контролер для завантаження фото в Azure"""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        """Завантаження фото на Azure та збереження URL"""
        survey = get_object_or_404(UserSurvey, user=request.user)

        if "photo" in request.FILES:
            photo_file = request.FILES["photo"]
            
            # Підключення до Azure
            try:
                blob_service_client = BlobServiceClient.from_connection_string(os.getenv("AZURE_STORAGE_CONNECTION_STRING"))
                container_client = blob_service_client.get_container_client(os.getenv("AZURE_CONTAINER"))

                # Генеруємо унікальне ім'я файлу
                blob_name = f"survey_photos/{uuid.uuid4()}_{photo_file.name}"
                blob_client = container_client.get_blob_client(blob_name)

                # Завантажуємо фото
                blob_client.upload_blob(photo_file, overwrite=True)

                # Формуємо URL фото
                photo_url = f"https://{os.getenv('AZURE_ACCOUNT_NAME')}.blob.core.windows.net/{os.getenv('AZURE_CONTAINER')}/{blob_name}"

                # Оновлюємо анкету
                survey.photo = photo_url
                survey.save()

                return Response({"message": "Фото успішно завантажено!", "photo_url": photo_url}, status=200)

            except Exception as e:
                return Response({"error": f"Помилка під час завантаження фото: {str(e)}"}, status=500)

        return Response({"error": "Файл не надіслано"}, status=400)
