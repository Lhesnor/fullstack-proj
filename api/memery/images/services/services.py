from typing import List

import images.services.constants as const
from django.db.models import QuerySet
from images.models import Image, User
from images.services.image_storage import storage
from images.services.ocr import scan_text
from images.services.text_search import filter_by_similarity
from images.services.utils import validate_file_extension


def find_images(owner: User, text: str) -> List[Image] | None:
    try:
        queryset: QuerySet = Image.objects.filter(owner=owner)
    except Image.DoesNotExist:
        return None
    images = filter_by_similarity(input_text=text, queryset=queryset)
    return images


def get_latest_images(owner: User) -> QuerySet | None:
    try:
        queryset = Image.objects.filter(owner=owner).order_by("-created")[
            : const.LATEST_IMAGES_NUM
        ]
    except Image.DoesNotExist:
        return None
    return queryset


def save_image(owner: User, image) -> bool:
    if not validate_file_extension(image.name):
        return False
    image_bytes = image.read()
    url = storage.save_to_storage(image_bytes)
    text = scan_text(image_bytes)
    image = Image(owner=owner, url=url, text=text)
    image.save()
    return True


def delete_image(owner: User, id: int) -> bool:
    try:
        Image.objects.filter(id=id, owner=owner).delete()
        return True
    except Image.DoesNotExist:
        return False
