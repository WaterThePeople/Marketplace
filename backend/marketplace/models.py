from django.db import models

# Create your models here.
CATEGORY_CHOICES = [("RPG","RPG"),("Action","Action"),("FPS","FPS"),("PLatformer","PLatformer"),("Open-World","Open-World")]
BUDGET_CHOICES = [("INDIE","INDIE"),("AA","AA"),("AAA","AAA")]
PLATFORM_CHOICES = [("PC","PC"),("Other","Other")]
class Game(models.Model):
    name = models.CharField(max_length=120)
    price = models.FloatField()
    discount = models.FloatField(null= True)
    image = models.ImageField()
    recommended = models.BooleanField(default=False)
    new = models.BooleanField(default=False)
    bestsellers = models.BooleanField(default=False)
    sale = models.BooleanField(default=False)
    popular = models.BooleanField(default=False)
    year = models.IntegerField(null= True)
    category = models.CharField(null= True,max_length=20, choices=CATEGORY_CHOICES)
    budget = models.CharField(null= True, max_length=20, choices=BUDGET_CHOICES)
    developer = models.CharField(null= True, max_length=50)
    platform = models.CharField(null= True,max_length=20, choices = PLATFORM_CHOICES)
