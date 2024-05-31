from django.contrib import admin
from django.urls import path, include
from marketplace import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/home',views.HomePageView.as_view()),
    path('api/allGame/modDel/<pk>',views.SingleModDelGameView.as_view()),
    path('api/allGame/add/<pk>',views.AddGameView.as_view()),
    path('api/allGame',views.AllGamesView.as_view()),
    path('api/categories',views.CategoriesView.as_view()),
    path('api/platforms',views.PlatformsView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
