from django_filters import rest_framework
from django.db.models import F, Q,ExpressionWrapper
from django.db.models import BooleanField
from .models import Game, Category, Platform
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
    category = rest_framework.ModelMultipleChoiceFilter(field_name='category__category_name', to_field_name = 'category_name',queryset= Category.objects.all())
    platform = rest_framework.ModelMultipleChoiceFilter(field_name='platform__platform_name', to_field_name = 'platform_name',queryset= Platform.objects.all())
    #pricerange = NumberRangeFilter(field_name='price',lookup_expr='range',label="price-range")
    discountedpricerange = NumberRangeFilter(field_name= 'discounted_price_calc',lookup_expr='range',label="discounted-price-range")
    sale = rest_framework.BooleanFilter(field_name = 'sale', label="sale")
    yearrange = NumberRangeFilter(field_name='year',lookup_expr='range',label="year-range")
    order = rest_framework.OrderingFilter(fields = (
        ('year','year'),
        ('discounted_price_calc','discounted_price')
    ))
    onlyOwner = rest_framework.BooleanFilter(
        method='filter_by_user_method',
        label='Filter by user'
    )
    def filter_by_user_method(self, queryset, name, value):
        if value and self.request and self.request.user.is_authenticated:
            queryset = queryset.filter(owner=self.request.user)
        return queryset

    def filter_queryset(self, queryset):
        queryset = queryset.annotate(sale=ExpressionWrapper(Q(discount__gt=0),output_field=BooleanField()))
        queryset = queryset.annotate( discounted_price_calc=F('price') - F('price') * F('discount'))
        return super().filter_queryset(queryset)
    class Meta:
        model = Game
        fields = ['recommended','new','category','platform','bestsellers','popular','budget']
