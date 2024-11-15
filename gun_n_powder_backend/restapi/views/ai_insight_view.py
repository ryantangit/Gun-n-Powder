
import os
import google.generativeai as genai
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.http.response import JsonResponse, HttpResponse
from rest_framework.views import csrf_exempt
from ..models import AIInsight


@csrf_exempt
@login_required
def ai_insight(request):
    if request.method == "GET":
        scanname = request.GET.get("scanname")+".txt"
        stored_response = AIInsight.objects.filter(scan_name=scanname).first()
        # If the response is stored, no need to query Google again.
        if (stored_response):
            return JsonResponse({"content": stored_response.AI_response})
        prompt_preheader = """Read this log and tell me next step of actions,
                        PASS means the test passed and is not a vulnerability. PASS means that the test case is not a vulnerability, stop marking it as a vulnverability.
                        Give me a summary of the logs and next course of action. """
        genai.configure(api_key=os.getenv("GOOGLE_LLM_API"))
        model = genai.GenerativeModel("gemini-1.5-flash")
        file_path = os.path.join("/container_zap", scanname)
        try:
            with open(file_path, "r") as file:
                content = file.read()
        except FileNotFoundError:
            return HttpResponse("File not found".encode('utf-8'), status = 404)
        except Exception as e:
            return HttpResponse(f"Error: {e}".encode('utf-8'), status = 500)
        try:
            response = model.generate_content(prompt_preheader + content)
            ai_insight = AIInsight.objects.create(
                  scan_name=scanname,
                  AI_response=response.text,
                  timestamp=timezone.now()
            )
            return JsonResponse({"content": response.text})
        except Exception as e:
            return HttpResponse(f"Error: {e}".encode('utf-8'), status=500)
