from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import HomeGameSerializer, AllGameSerializer, CategorySerializer, PlatformSerializer
from .models import Game, Category, Platform
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework
from django.db.models import F, Q,ExpressionWrapper
from django.db.models import BooleanField
# Create your views here.

class NumberRangeFilter(rest_framework.BaseRangeFilter, rest_framework.NumberFilter):
    pass

class HomePageFilterSet(rest_framework.FilterSet):
    sale = rest_framework.BooleanFilter(field_name = 'sale', label="sale")
    def filter_queryset(self, queryset):
        queryset = queryset.annotate(sale=ExpressionWrapper(Q(discount__gt=0),output_field=BooleanField()))
        return super().filter_queryset(queryset)
    class Meta:
        model = Game
        fields = ['recommended','new','bestsellers','popular']

class FullListFilterSet(rest_framework.FilterSet):
#    def to_html(self, request, queryset, view):
    category = rest_framework.CharFilter(field_name='category__category_name', lookup_expr='exact')
    platform = rest_framework.CharFilter(field_name='platform__platform_name', lookup_expr='exact')
    #pricerange = NumberRangeFilter(field_name='price',lookup_expr='range',label="price-range")
    discountedpricerange = NumberRangeFilter(field_name= 'discounted_price_calc',lookup_expr='range',label="discounted-price-range")
    sale = rest_framework.BooleanFilter(field_name = 'sale', label="sale")
    yearrange = NumberRangeFilter(field_name='year',lookup_expr='range',label="year-range")
    order = rest_framework.OrderingFilter(fields = (
        ('year','year'),
        ('discounted_price_calc','discounted_price')
        
    ))

    def filter_queryset(self, queryset):
        queryset = queryset.annotate(sale=ExpressionWrapper(Q(discount__gt=0),output_field=BooleanField()))
        queryset = queryset.annotate( discounted_price_calc=F('price') - F('price') * F('discount'))
        return super().filter_queryset(queryset)
    class Meta:
        model = Game
        fields = ['recommended','new','bestsellers','popular','budget']

class HomePageView(generics.ListAPIView):
    serializer_class = HomeGameSerializer
    queryset = Game.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = HomePageFilterSet

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

class CategoriesView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class PlatformsView(generics.ListCreateAPIView):
    serializer_class = PlatformSerializer
    queryset = Platform.objects.all()