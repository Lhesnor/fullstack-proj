from django.http import HttpResponse
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import services
from .serializers import ImagesSerializer


# Create your views here.
@api_view(["GET"])
def health_check(request):
    return HttpResponse("api is up")


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def search(request):
    images = services.find_images(owner=request.user, text=request.query_params["text"])
    if not images:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ImagesSerializer(images, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def latest(request):
    images = services.get_latest_images(owner=request.user)
    if not images:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ImagesSerializer(images, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload(request):
    image = request.FILES["image"]
    result = services.save_image(owner=request.user, image=image)
    if not result:
        return Response(
            data="Invalid image format", status=status.HTTP_406_NOT_ACCEPTABLE
        )
    return Response(status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request):
    result = services.delete_image(owner=request.user, id=request.query_params["id"])
    return (
        Response(status=status.HTTP_204_NO_CONTENT)
        if result
        else Response(status=status.HTTP_404_NOT_FOUND)
    )
