from rest_framework import generics
from .serializers import *
from .models import Game, Category, Platform
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from rest_framework import permissions
# Create your views here.


class HomePageView(generics.ListAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = HomePageFilterSet


class SingleModDelGameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
#    filter_backends = [DjangoFilterBackend]
#    filterset_fields = ['recommended','new','bestsellers']


class AddGameView(generics.CreateAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AllGamesView(generics.ListAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FullListFilterSet


class CategoriesView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class PlatformsView(generics.ListCreateAPIView):
    serializer_class = PlatformSerializer
    queryset = Platform.objects.all()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
