from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class create_user(APIView):
    def post(self, request):
        data = request.data  # Automatically parses JSON
        username = data.get("username")
        password = data.get("password")

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"message": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the new user
        user = User.objects.create(username=username, password=make_password(password))
        user.save()
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )
