from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from ..models import ScanLog
from django.core import serializers
from django.http import JsonResponse

@login_required
def user_logs(request):
    # Get all scan logs for the currently logged-in user
    scan_logs = ScanLog.objects.filter(requester=request.user).order_by('-timestamp')[:10]

    scan_logs_data = [
            {
                'scan_name': log.scan_name,
                'url': log.url,
                'timestamp': log.timestamp.isoformat(),
            }
            for log in scan_logs]

    return JsonResponse({'scan_logs': scan_logs_data})
