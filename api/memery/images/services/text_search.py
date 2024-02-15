from typing import List

import images.services.constants as const
from django.db.models import QuerySet
from fuzzywuzzy import fuzz
from images.models import Image


def compare_texts(text_a: str, text_b: str) -> float:
    ratio = fuzz.ratio(text_a, text_b)
    partial_ratio = fuzz.partial_ratio(text_a, text_b)
    mean_ratio = (ratio + partial_ratio) / 2
    return mean_ratio


def filter_by_similarity(input_text: str, queryset: QuerySet) -> List[Image]:
    results = []
    for image in queryset:
        similarity = compare_texts(input_text, image.text)
        if similarity >= const.MINIMAL_TEXT_SIMILARITY_INDEX:
            results.append({"image": image, "similarity": similarity})
    return [
        result["image"] for result in sorted(results, key=lambda x: -x["similarity"])
    ]
