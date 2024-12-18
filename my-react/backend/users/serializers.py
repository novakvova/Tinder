from rest_framework import serializers
from pymongo.errors import DuplicateKeyError
from backend.settings import db
from .models import CustomUser

users_collection = db["users"]  

class UserRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        try:
            # Зберігаємо користувача у MongoDB
            users_collection.insert_one(user.to_dict())
        except DuplicateKeyError:
            raise serializers.ValidationError("Користувач із таким email вже існує")
        return user
