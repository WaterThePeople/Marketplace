from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import HomeGameSerializer, AllGameSerializer
from .models import Game

# Create your views here.

class HomePageView(generics.ListCreateAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()