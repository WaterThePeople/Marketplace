from django.contrib import admin
from django.urls import path, include
from marketplace import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',views.HomePageView.as_view()),
]
