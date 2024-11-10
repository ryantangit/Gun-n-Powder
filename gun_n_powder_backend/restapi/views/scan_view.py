import json
from datetime import datetime
from django.http.response import JsonResponse

def scan(request):
    if request.method == "POST":
        # Do some scanning
        data = json.loads(request.body)
        targetUrl = data.get("url")
        # Do Scanning - results in file path/time
        name = generate_unique_name()
        #
        return JsonResponse({"Status": "Scanning complete", "name": name})




def generate_unique_name(base_name="Scan"):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    name = f"{base_name}_{timestamp}"
    return name
