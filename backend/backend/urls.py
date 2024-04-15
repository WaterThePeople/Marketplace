from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from marketplace import views

router = routers.DefaultRouter()
router.register(r'TestItems', views.TestItemView, 'marketplace')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
