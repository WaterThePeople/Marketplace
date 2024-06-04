from django.db import models

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    category_name = models.CharField(max_length=50)
    def __str__(self):
        return self.category_name

class Budget(models.Model):
    budget_name = models.CharField(max_length=50)

class Platform(models.Model):
    platform_name = models.CharField(max_length=50)
    def __str__(self):
        return self.platform_name
# Create your models here.
CATEGORY_CHOICES = [("RPG","RPG"),("Action","Action"),("FPS","FPS"),("PLatformer","PLatformer"),("Open-World","Open-World")]
BUDGET_CHOICES = [("NONE","NONE"),("INDIE","INDIE"),("AA","AA"),("AAA","AAA"),('AAAA','AAAA')]
PLATFORM_CHOICES = [("PC","PC"),("Other","Other")]
def get_or_create_default_admin_user():
    user,created =  User.objects.get_or_create(username='admin',is_staff=True,is_superuser=True)
    if created:
        user.set_password('admin')
        user.save()
    return user.id

class Game(models.Model):
    name = models.CharField(max_length=120)
    price = models.FloatField()
    discount = models.FloatField(default=0,validators=[MinValueValidator(0), MaxValueValidator(1)])
    image = models.ImageField()
    recommended = models.BooleanField(default=False)
    new = models.BooleanField(default=False)
    bestsellers = models.BooleanField(default=False)
    popular = models.BooleanField(default=False)
    year = models.IntegerField(null= True)
    category = models.ManyToManyField(Category)
    budget = models.CharField(null= True, max_length=20, choices=BUDGET_CHOICES)
    developer = models.CharField(null= True, max_length=50)
    platform = models.ManyToManyField(Platform)
    owner = models.ForeignKey(User, related_name='submissions', on_delete=models.CASCADE, default=get_or_create_default_admin_user)
    def __str__(self):
        return self.name

