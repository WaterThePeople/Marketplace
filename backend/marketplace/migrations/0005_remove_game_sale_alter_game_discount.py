# Generated by Django 5.0.4 on 2024-05-30 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0004_alter_game_discount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='sale',
        ),
        migrations.AlterField(
            model_name='game',
            name='discount',
            field=models.FloatField(default=0),
        ),
    ]
