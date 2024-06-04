from rest_framework import serializers
from .models import Game, Category, Platform

from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name']

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id','platform_name']

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
    owner = serializers.ReadOnlyField(source='owner.username')
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
        fields = ('id', 'name', 'price','discount','discount_price', 'image','recommended','new','sale','year','category','budget','developer','platform','owner')

class AddGameSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    platform = serializers.PrimaryKeyRelatedField(queryset=Platform.objects.all(), many=True)
    image = serializers.ImageField()
    class Meta:
        model = Game
        fields =  ('name', 'price','discount', 'image','year','category','budget','developer','platform','owner')
    def create(self, validated_data):
        categories_data = validated_data.pop('category')
        platforms_data = validated_data.pop('platform')
        game = Game.objects.create(**validated_data)
        game.category.set(categories_data)
        game.platform.set(platforms_data)
        return game

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('category', None)
        platforms_data = validated_data.pop('platform', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if categories_data is not None:
            instance.category.set(categories_data)
        if platforms_data is not None:
            instance.platform.set(platforms_data)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    submissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Game.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'submissions']

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