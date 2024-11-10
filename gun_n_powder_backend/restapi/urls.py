from django.urls import path

from .views import api_login, api_logout, create_user, get_username, ping, scan

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("createuser/", create_user.as_view(), name="create-user"),
    path("login/", api_login, name="login"),
    path("logout/", api_logout, name="logout"),
    path("userinfo/", get_username, name="user"),
    path("scan/", scan, name="OWASP scan")
]
