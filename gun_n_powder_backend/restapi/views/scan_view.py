import json
import os
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from django.utils.autoreload import subprocess
from django.views.decorators.csrf import csrf_exempt

@login_required
@csrf_exempt
def scan(request):
    if request.method == "POST":
        # Do some scanning
        data = json.loads(request.body)
        targetUrl = data.get("url")
        # Do Scanning - results in file path/time
        name = generate_unique_name()
        reportName = name + ".html"
        logName = name + ".txt"

        reportPath = os.path.join("/container_zap", reportName)
        logPath = os.path.join("/container_zap", logName)

        command = [
                    "docker", "run", "-v", "/container_zap:/zap/wrk/:rw", "-v", "/var/run/docker.sock:/var/run/docker.sock", "-t", "zaproxy/zap-stable",
                    "zap-baseline.py", "-t", targetUrl, "-r", reportPath
        ]

        with open(logPath, "w") as log:
            result = subprocess.run(command, stdout=log, stderr=log)

        status = "Scanning complete" if result.returncode == 0 else "Scanning failed"

        # Return status
        return JsonResponse({"Status": status, "name": name})




def generate_unique_name(base_name="Scan"):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    name = f"{base_name}_{timestamp}"
    return name
