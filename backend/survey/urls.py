from django.urls import path
from .views import UserSurveyView, UploadPhotoView, SurveyListView

urlpatterns = [
    path("", UserSurveyView.as_view(), name="user-survey"),  
    path("upload-photo/", UploadPhotoView.as_view(), name="upload-photo"),
    path("list/", SurveyListView.as_view(), name="survey-list"),
]
