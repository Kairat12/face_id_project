from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name='index'),
    path('login/face-id/', face_id_login, name='face_id_login'),
]