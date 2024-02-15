FROM python:3.10.5-alpine
RUN apk add tesseract-ocr
RUN apk upgrade
ADD requirements.txt .
RUN pip install -r ./requirements.txt

COPY . ./
WORKDIR ./memery
RUN python manage.py migrate
CMD ["gunicorn", "memery.wsgi", "-b", "0.0.0.0:8000"]
