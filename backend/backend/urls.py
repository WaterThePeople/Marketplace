from django.contrib import admin
from django.urls import path, include
from marketplace import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/home',views.HomePageView.as_view()),
    path('api/createMod/<pk>',views.AddModGameView.as_view()),
]
