from abc import ABC, abstractmethod

import requests


class Storage(ABC):
    base_url: str

    @abstractmethod
    def save_to_storage(self, image_bytes: bytes) -> str:
        pass


class TelegraphStorage(Storage):
    base_url = "https://telegra.ph/upload"

    def save_to_storage(self, image_bytes: bytes) -> str:
        files = {"upload_file": image_bytes}
        response = requests.post(self.base_url, files=files).json()
        path = response[0]["src"]
        return "https://telegra.ph" + path


storage = TelegraphStorage()
