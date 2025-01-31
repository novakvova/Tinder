from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UserSurvey
from .serializers import UserSurveySerializer
from django.shortcuts import get_object_or_404

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
    """Контролер для завантаження фото в анкету"""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        """Завантаження фото"""
        survey = get_object_or_404(UserSurvey, user=request.user)

        if "photo" in request.FILES:
            survey.photo = request.FILES["photo"]
            survey.save()
            return Response({"message": "Фото успішно завантажено!"}, status=200)

        return Response({"error": "Файл не надіслано"}, status=400)
