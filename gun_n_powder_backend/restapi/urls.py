from django.urls import path

from .views import api_login, create_user, get_username, ping

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("createuser/", create_user.as_view(), name="create-user"),
    path("login/", api_login, name="login"),
    path("userinfo", get_username, name="user"),
]
