from django.contrib import admin
from .models import Game

class TestAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'discount')

# Register your models here.

admin.site.register(Game, TestAdmin)