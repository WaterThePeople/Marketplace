from rest_framework import serializers
from .models import Game, Category, Platform

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name']

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['platform_name']

class HomeGameSerializer(serializers.ModelSerializer):
    discount_price = serializers.SerializerMethodField('get_discount_price')

    def get_discount_price(self, obj):
        if obj.discount is not None:
            return obj.price - obj.price * obj.discount
        else: 
            return obj.price
    class Meta:
        model = Game
        fields = ('id', 'name', 'price','discount_price', 'image','recommended','new','bestsellers','sale','popular')



class AllGameSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    platform = serializers.SerializerMethodField()
    discount_price = serializers.SerializerMethodField('get_discount_price')
    def get_category(self, obj):
        return [category.category_name for category in obj.category.all()]

    def get_platform(self, obj):
        return [platform.platform_name for platform in obj.platform.all()]
    
    def get_discount_price(self, obj):
        if obj.discount is not None and obj.sale:
            return obj.price - obj.price * obj.discount
        else: 
            return obj.price
    class Meta:
        model = Game
        fields = ('id', 'name', 'price','discount_price', 'image','recommended','new','sale','year','category','budget','developer','platform')