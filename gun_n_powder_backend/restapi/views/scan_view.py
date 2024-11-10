import json
import os
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
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
        #
        file_path = os.path.join("/container_zap", f"{name}.txt")
        with open(file_path, "w") as f:
            f.write(name)

        # Return status
        return JsonResponse({"Status": "Scanning complete", "name": name})




def generate_unique_name(base_name="Scan"):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    name = f"{base_name}_{timestamp}"
    return name
