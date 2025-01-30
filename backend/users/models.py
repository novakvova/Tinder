from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  
    full_name = models.CharField(max_length=255, blank=True, null=True)  
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # ✅ Поле має бути тут
    bio = models.TextField(max_length=500, blank=True)  
    display_name = models.CharField(max_length=255, blank=True, null=True)  

    def __str__(self):
        return self.username
