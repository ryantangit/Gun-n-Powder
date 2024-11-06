from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


@login_required
def get_username(request):
    return JsonResponse({"username": request.user.username})
