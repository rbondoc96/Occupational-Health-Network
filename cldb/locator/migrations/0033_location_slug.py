# Generated by Django 3.0.6 on 2020-05-07 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locator', '0032_auto_20200507_1345'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
    ]