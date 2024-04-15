from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TestItemSerializer
from .models import TestItem

# Create your views here.

class TestItemView(viewsets.ModelViewSet):
    serializer_class = TestItemSerializer
    queryset = TestItem.objects.all()