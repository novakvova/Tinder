from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ProfileSerializer
from .models import CustomUser

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        print(f"Request user: {request.user}")  
        print(f"Is authenticated: {request.user.is_authenticated}") 

        if not request.user.is_authenticated:
            return Response({"error": "Неавторизований доступ"}, status=403)

        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=200)

    def put(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Профіль оновлено успішно!"}, status=200)
        return Response(serializer.errors, status=400)
