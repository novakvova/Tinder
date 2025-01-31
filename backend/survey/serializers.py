from rest_framework import serializers
from .models import UserSurvey

class UserSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSurvey
        fields = "__all__"
