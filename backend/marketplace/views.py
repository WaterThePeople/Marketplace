from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import HomeGameSerializer, AllGameSerializer
from .models import Game
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class HomePageView(generics.ListAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recommended','new','bestsellers']

class SingleModDelGameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recommended','new','bestsellers']

class AddGameView(generics.CreateAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()