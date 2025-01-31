from rest_framework import serializers
from .models import UserSurvey

class UserSurveySerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source="user.username", read_only=True)  

    class Meta:
        model = UserSurvey
        fields = ["id", "age", "gender", "interests", "photo", "display_name"]
