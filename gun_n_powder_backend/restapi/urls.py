from django.urls import path

from .views import api_login, create_user, ping

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("createuser/", create_user.as_view(), name="create-user"),
    path("login/", api_login, name="login"),
]
