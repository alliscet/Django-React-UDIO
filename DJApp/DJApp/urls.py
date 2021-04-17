from rest_framework import routers

from django.contrib import admin
from django.urls import path,include

from .views import PeopleViewSet
from . import views

router = routers.DefaultRouter()

router.register("people", PeopleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('peoplesearch/', views.search),
    path('api/', include(router.urls)),

]
