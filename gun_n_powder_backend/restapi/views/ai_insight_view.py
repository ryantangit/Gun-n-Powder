
import os
import google.generativeai as genai
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse, HttpResponse
from rest_framework.views import csrf_exempt


@csrf_exempt
@login_required
def ai_insight(request):
    prompt_preheader = """Read this log and tell me next step of actions,
                        PASS means the test passed and is not a vulnerability. PASS means that the test case is not a vulnerability, stop marking it as a vulnverability.
                        Give me a summary of the logs and next course of action. """
    genai.configure(api_key=os.getenv("GOOGLE_LLM_API"))
    model = genai.GenerativeModel("gemini-1.5-flash")
    if request.method == "GET":
        scanname = request.GET.get("scanname")+".txt"
        file_path = os.path.join("/container_zap", scanname)
        try:
            with open(file_path, "r") as file:
                content = file.read()
                response = model.generate_content(prompt_preheader + content)
                return JsonResponse({"content": response.text})
        except FileNotFoundError:
            return HttpResponse("File not found".encode('utf-8'), status = 404)
        except Exception as e:
            return HttpResponse(f"Error: {e}".encode('utf-8'), status = 500)
