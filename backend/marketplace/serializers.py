from rest_framework import serializers
from .models import Game

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
    discount_price = serializers.SerializerMethodField('get_discount_price')

    def get_discount_price(self, obj):
        if obj.discount is not None:
            return obj.price - obj.price * obj.discount
        else: 
            return obj.price
    class Meta:
        model = Game
        fields = ('id', 'name', 'price', 'image','sale','year','category','budget','developer','platform')