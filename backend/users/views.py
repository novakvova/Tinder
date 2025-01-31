from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserRegisterSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.settings import api_settings
from azure.storage.blob import BlobServiceClient
import os
import logging

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Користувач успішно зареєстрований!", "user_id": user.id}, status=201)
        
        logger.error(f"Помилка реєстрації: {serializer.errors}")
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            if api_settings.UPDATE_LAST_LOGIN:
                update_last_login(None, user)

            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=200)

        return Response({"error": "Неправильне ім'я користувача або пароль."}, status=400)


class ProfileView(APIView):
    """Оновлення профілю: ім'я, аватар"""
    permission_classes = [IsAuthenticated]  
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        user = request.user

        if 'avatar' in request.FILES:
            try:
                connection_string = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
                container_name = os.getenv('AZURE_CONTAINER', 'avatars')

                blob_service_client = BlobServiceClient.from_connection_string(connection_string)
                blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"{user.id}/avatar.jpg")

                avatar = request.FILES['avatar']
                blob_client.upload_blob(avatar, overwrite=True)

                user.avatar = blob_client.url  
                user.save()

            except Exception as e:
                logger.error(f"Помилка при завантаженні аватара: {str(e)}")
                return Response({"error": "Помилка при завантаженні аватара"}, status=500)

        serializer = UserRegisterSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Профіль оновлено успішно!", "avatar_url": user.avatar}, status=200)

        return Response(serializer.errors, status=400)
