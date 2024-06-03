from django.contrib import admin
from django.urls import path, include
from marketplace import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/home',views.HomePageView.as_view()),
    path('api/allGame/modDel/<pk>',views.SingleModDelGameView.as_view()),
    path('api/allGame/add/',views.AddGameView.as_view()),
    path('api/allGame',views.AllGamesView.as_view()),
    path('api/categories',views.CategoriesView.as_view()),
    path('api/platforms',views.PlatformsView.as_view()),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', views.UserList.as_view()),
    path('api/users/<int:pk>/', views.UserDetail.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]