# myapp/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .serializers import UserRegistrationSerializer
from django.contrib.auth import authenticate

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Assuming UserRegistrationSerializer includes 'name' field
            user_serializer = UserSerializer(user)
            
            return Response({'message': 'User registered successfully', 'user': user_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # User is authenticated, generate access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Serialize user data
            serializer = UserSerializer(user)

            return Response({'access_token': access_token, 'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)