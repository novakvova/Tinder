from django.urls import path
from .views import UserSurveyView, UploadPhotoView

urlpatterns = [
    path("", UserSurveyView.as_view(), name="user-survey"),  # ✅ Має бути порожній, тому що /api/survey/ вже є в urls.py
    path("upload-photo/", UploadPhotoView.as_view(), name="upload-photo"),
]
