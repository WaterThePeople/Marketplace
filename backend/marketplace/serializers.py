from rest_framework import serializers
from .models import Game, Category, Platform

from django.contrib.auth.models import User

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
    sale = serializers.SerializerMethodField()
    def get_sale(self,obj):
        return obj.discount != 0
    def get_discount_price(self, obj):
        return obj.price - obj.price * obj.discount
    class Meta:
        model = Game
        fields = ('id', 'name', 'price','discount_price', 'image','recommended','new','bestsellers','sale','popular')



class AllGameSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    platform = serializers.SerializerMethodField()
    sale = serializers.SerializerMethodField()
    discount_price = serializers.SerializerMethodField('get_discount_price')
    def get_sale(self,obj):
        return obj.discount != 0
    def get_category(self, obj):
        return [category.category_name for category in obj.category.all()]

    def get_platform(self, obj):
        return [platform.platform_name for platform in obj.platform.all()]
    
    def get_discount_price(self, obj):
        return obj.price - obj.price * obj.discount
    
    class Meta:
        model = Game
        fields = ('id', 'name', 'price','discount_price', 'image','recommended','new','sale','year','category','budget','developer','platform')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user