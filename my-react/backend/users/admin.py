from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'full_name')
    list_filter = ('is_staff', 'is_active')
