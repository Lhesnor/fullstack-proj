import io

import images.services.constants as const
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = const.TESSERACT_PATH


def format_text(text: str) -> str:
    return text.replace("\n", " ").lower()


def scan_text(image_bytes: bytes) -> str:
    image_pil = Image.open(io.BytesIO(image_bytes))
    raw_text = pytesseract.image_to_string(image_pil, lang="eng")
    return format_text(raw_text)
