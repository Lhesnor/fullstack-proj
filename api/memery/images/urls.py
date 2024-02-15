from django.urls import path
from images.views import delete, health_check, latest, search, upload

urlpatterns = [
    path("api/v1/search", search),
    path("api/v1/latest", latest),
    path("api/v1/upload", upload),
    path("api/v1/delete", delete),
    path("api/health_check", health_check),
]
