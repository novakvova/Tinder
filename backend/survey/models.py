from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSurvey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="survey")
    age = models.PositiveIntegerField(default=18)
    gender = models.CharField(max_length=10, choices=[("male", "Чоловік"), ("female", "Жінка")], default="male")
    interests = models.TextField(blank=True, null=True)
    photo = models.URLField(max_length=500, blank=True, null=True)  

    def __str__(self):
        return f"Анкета {self.user.username}"
