import json
import os
import docker
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

        client = docker.from_env()
        container = client.containers.run(
            image="zaproxy/zap-stable",
            command=[
                "zap-baseline.py",
                "-t", targetUrl,
                "-r", "/container_zap/" + reportName,
                "-I"
            ],
            volumes={
                "/home/ubuntu/zap": {  # Map the host's ~/zap directory to /container_zap inside the container
                    "bind": "/container_zap",
                    "mode": "rw"
                }
            },
            user="root",  # Run as root
            detach=True
        )
        result = container.wait()
        logs = container.logs()
        #Write logs to file
        with open(logPath, "wb") as f:
            f.write(logs)
        container.remove()
        if os.path.exists(reportPath):
            status = "Scanning complete"
        else:
            status = "Scanning failed to generate report"



        # Return status
        return JsonResponse({"Status": status, "name": name})




def generate_unique_name(base_name="Scan"):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    name = f"{base_name}_{timestamp}"
    return name
