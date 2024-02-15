from django.contrib.auth import get_user_model
from images.serializers import UserSerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView


class CreateUserView(CreateAPIView):
    model = get_user_model()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
