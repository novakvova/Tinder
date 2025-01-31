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
        try:
            survey = UserSurvey.objects.get(user=request.user)
            serializer = UserSurveySerializer(survey)
            return Response(serializer.data)
        except UserSurvey.DoesNotExist:
            return Response({"detail": "Анкета не знайдена"}, status=404)

    def put(self, request):
        survey, created = UserSurvey.objects.get_or_create(user=request.user)
        serializer = UserSurveySerializer(survey, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class UploadPhotoView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        survey, created = UserSurvey.objects.get_or_create(user=request.user)  

        if "photo" not in request.FILES:
            return Response({"error": "Файл не надіслано"}, status=400)

        photo_file = request.FILES["photo"]

        try:
          
            blob_service_client = BlobServiceClient.from_connection_string(os.getenv("AZURE_STORAGE_CONNECTION_STRING"))
            container_client = blob_service_client.get_container_client(os.getenv("AZURE_CONTAINER"))

          
            blob_name = f"survey_photos/{uuid.uuid4()}_{photo_file.name}"
            blob_client = container_client.get_blob_client(blob_name)

          
            blob_client.upload_blob(photo_file, overwrite=True)

           
            photo_url = f"https://{os.getenv('AZURE_ACCOUNT_NAME')}.blob.core.windows.net/{os.getenv('AZURE_CONTAINER')}/{blob_name}"

            survey.photo = photo_url
            survey.save()

            return Response({"message": "Фото успішно завантажено!", "photo_url": photo_url}, status=200)

        except Exception as e:
            return Response({"error": f"Помилка під час завантаження фото: {str(e)}"}, status=500)
class SurveyListView(APIView):
   
    permission_classes = [IsAuthenticated]

    def get(self, request):
        surveys = UserSurvey.objects.exclude(user=request.user)  
        serialized_surveys = [
            {
                **UserSurveySerializer(survey).data,
                "name": survey.user.display_name or survey.user.username,  
            }
            for survey in surveys
        ]
        return Response(serialized_surveys)