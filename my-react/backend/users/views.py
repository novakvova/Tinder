from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserRegisterSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.settings import api_settings
from azure.storage.blob import BlobServiceClient
import os


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Користувач успішно зареєстрований!"}, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        user = request.user

        # Azure Storage Configuration
        connection_string = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
        container_name = 'avatars'

        if 'avatar' in request.FILES:
            blob_service_client = BlobServiceClient.from_connection_string(connection_string)
            blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"{user.id}/avatar.jpg")

            # Upload the avatar to Azure Blob Storage
            avatar = request.FILES['avatar']
            blob_client.upload_blob(avatar, overwrite=True)

            # Save the URL in the user's profile
            user.avatar = blob_client.url

        serializer = UserRegisterSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Профіль оновлено успішно!", "avatar_url": user.avatar}, status=200)

        return Response(serializer.errors, status=400)
# users/views.py  

# from django.shortcuts import render, redirect, get_object_or_404  
# from django.views import View  
# from django.contrib.auth.models import User  
# from django import forms  

# # Форма для користувача  
# class UserForm(forms.ModelForm):  
#     class Meta:  
#         model = User  
#         fields = ['username', 'email', 'first_name', 'last_name']  

# # Список користувачів  
# class UserListView(View):  
#     def get(self, request):  
#         users = User.objects.all()  
#         return render(request, 'users/user_list.html', {'users': users})  

# # Деталі користувача  
# class UserDetailView(View):  
#     def get(self, request, pk):  
#         user = get_object_or_404(User, pk=pk)  
#         return render(request, 'users/user_detail.html', {'user': user})  

# # Створити користувача  
# class UserCreateView(View):  
#     def get(self, request):  
#         form = UserForm()  
#         return render(request, 'users/user_form.html', {'form': form})  

#     def post(self, request):  
#         form = UserForm(request.POST)  
#         if form.is_valid():  
#             form.save()  
#             return redirect('user_list')  
#         return render(request, 'users/user_form.html', {'form': form})  

# # Оновити користувача  
# class UserUpdateView(View):  
#     def get(self, request, pk):  
#         user = get_object_or_404(User, pk=pk)  
#         form = UserForm(instance=user)  
#         return render(request, 'users/user_form.html', {'form': form})  

#     def post(self, request, pk):  
#         user = get_object_or_404(User, pk=pk)  
#         form = UserForm(request.POST, instance=user)  
#         if form.is_valid():  
#             form.save()  
#             return redirect('user_list')  
#         return render(request, 'users/user_form.html', {'form': form})  

# # Видалити користувача  
# class UserDeleteView(View):  
#     def get(self, request, pk):  
#         user = get_object_or_404(User, pk=pk)  
#         return render(request, 'users/user_confirm_delete.html', {'user': user})  

#     def post(self, request, pk):  
#         user = get_object_or_404(User, pk=pk)  
#         user.delete()  
#         return redirect('user_list')