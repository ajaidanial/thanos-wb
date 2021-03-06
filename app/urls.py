from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
    path('validate', views.validate, name='validate'),
    path('logout', views.logout, name='logout'),
    path('chat', views.chat, name='chat'),
    path('', views.login, name='login'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
