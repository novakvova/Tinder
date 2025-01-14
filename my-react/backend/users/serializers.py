from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings  # Імпортуємо налаштування Django

CustomUser = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'full_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name')
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('display_name', 'bio', 'avatar')

    def get_avatar(self, obj):
        if obj.avatar and obj.avatar.name:
            return f"https://{settings.AZURE_ACCOUNT_NAME}.blob.core.windows.net/{settings.AZURE_CONTAINER}/{obj.avatar.name}"
        return None
