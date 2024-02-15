from django.contrib.auth.models import Permission, User
from django.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    premium = models.BooleanField(default=False, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True)


class Image(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.CharField(max_length=100)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True, null=True)
