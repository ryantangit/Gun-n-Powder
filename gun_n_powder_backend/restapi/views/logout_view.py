from django.contrib.auth import logout
from django.http import JsonResponse


def api_logout(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logged out successfully"})
    return JsonResponse({"error": "Invalid request method"}, status=400)
