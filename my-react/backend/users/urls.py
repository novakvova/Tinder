from django.urls import path
from .views import RegisterView, LoginView
from .views_profile import ProfileView
from .views import UserListView, UserDetailView, UserCreateView, UserUpdateView, UserDeleteView
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
     path('', UserListView.as_view(), name='user_list'),  
    path('create/', UserCreateView.as_view(), name='user_create'),  
    path('update/<int:pk>/', UserUpdateView.as_view(), name='user_update'),  
    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user_delete'),  
    path('<int:pk>/', UserDetailView.as_view(), name='user_detail'),  
]
