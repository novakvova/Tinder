from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from azure.storage.blob import BlobServiceClient
import os
from .serializers import ProfileSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):  
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=200)

    def put(self, request): 
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            if 'avatar' in request.FILES:
                avatar_file = request.FILES['avatar']
                blob_service_client = BlobServiceClient.from_connection_string(
                    os.getenv("AZURE_STORAGE_CONNECTION_STRING")
                )
                container_client = blob_service_client.get_container_client(os.getenv("AZURE_CONTAINER"))

      
                blob_name = f"avatars/{user.id}_{avatar_file.name}"
                blob_client = container_client.get_blob_client(blob_name)

         
                blob_client.upload_blob(avatar_file, overwrite=True)

                
                user.avatar = blob_name 

            user.save()
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)
