import images.services.constants as const


def validate_file_extension(filename: str) -> bool:
    return filename.rsplit(".")[-1].lower() in const.VALID_EXTENSIONS
