from django import forms
from django.contrib import admin
from .models import Game, Category,Budget,Platform

class GameAdminForm(forms.ModelForm):
    categories = forms.ModelMultipleChoiceField(
        queryset=Category.objects.all(),
        widget=forms.CheckboxSelectMultiple,  # This will display checkboxes instead of the default widget
        required=True
    )
    platforms = forms.ModelMultipleChoiceField(
        queryset=Platform.objects.all(),
        widget=forms.CheckboxSelectMultiple,  # This will display checkboxes instead of the default widget
        required=True
    )
    class Meta:
        model = Game
        fields = '__all__'


class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'discount')
#    form = GameAdminForm
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('budget_name',)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ('platform_name',)
# Register your models here.

admin.site.register(Game, GameAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Budget, BudgetAdmin)
admin.site.register(Platform, PlatformAdmin)