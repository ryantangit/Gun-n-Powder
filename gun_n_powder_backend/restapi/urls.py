from django.urls import path

from .views import create_user, ping

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("createuser/", create_user.as_view(), name="create-user"),
]
