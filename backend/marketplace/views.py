from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import HomeGameSerializer, AllGameSerializer
from .models import Game
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework
from django.db.models import F
# Create your views here.

class NumberRangeFilter(rest_framework.BaseRangeFilter, rest_framework.NumberFilter):
    pass
class FullListFilterSet(rest_framework.FilterSet):
#    def to_html(self, request, queryset, view):
    category = rest_framework.CharFilter(field_name='category__category_name', lookup_expr='icontains')
    platform = rest_framework.CharFilter(field_name='platform__platform_name', lookup_expr='icontains')
    pricerange = NumberRangeFilter(field_name='price',lookup_expr='range',label="price-range")
    discounted_price = NumberRangeFilter(method='filter_discounted_price',label="discounted-price-range")
    yearrange = NumberRangeFilter(field_name='year',lookup_expr='range',label="year-range")
    def filter_discounted_price(self, queryset, name, value):
        # Annotate the queryset with the calculated field
        queryset = queryset.annotate(discounted_price_calc=F('price') - F('price') * F('discount'))
        return queryset.filter(discounted_price_calc__range=value)

    class Meta:
        model = Game
        fields = ['recommended','new','bestsellers','sale','popular','budget']

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