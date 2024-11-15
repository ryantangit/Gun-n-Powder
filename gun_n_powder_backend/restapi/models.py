from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ScanLog(models.Model):
    requester = models.ForeignKey(User, on_delete=models.CASCADE)
    scan_name = models.CharField(max_length=255, unique=True)
    url = models.URLField()  # URL that was scanned
    timestamp = models.DateTimeField(auto_now_add=True)


class AIInsight(models.Model):
    scan_name = models.CharField(max_length=255, unique=True)
    AI_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
