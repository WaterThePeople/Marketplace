from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import HomeGameSerializer, AllGameSerializer
from .models import Game
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework

# Create your views here.

class NumberRangeFilter(rest_framework.BaseRangeFilter, rest_framework.NumberFilter):
    pass
class FullListFilterSet(rest_framework.FilterSet):
#    def to_html(self, request, queryset, view):
    totalprice = rest_framework.NumericRangeFilter(field_name='price',lookup_expr='range')
    rangeprice = NumberRangeFilter(field_name='price',lookup_expr='range',label="price-range")
    class Meta:
        model = Game
        fields = ['recommended','new','bestsellers','sale','popular']

class HomePageView(generics.ListAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recommended','new','bestsellers','sale','popular']

class SingleModDelGameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()
#    filter_backends = [DjangoFilterBackend]
#    filterset_fields = ['recommended','new','bestsellers']

class AddGameView(generics.CreateAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()

class AllGamesView(generics.ListAPIView):
    serializer_class = AllGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = FullListFilterSet