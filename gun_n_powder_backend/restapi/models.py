from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ScanLog(models.Model):
    requester = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to user who requested the scan
    scan_name = models.CharField(max_length=255, unique=True)  # Unique scan name
    url = models.URLField()  # URL that was scanned
    timestamp = models.DateTimeField(auto_now_add=True)  # Time of the request
