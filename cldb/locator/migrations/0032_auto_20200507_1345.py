# Generated by Django 3.0.6 on 2020-05-07 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locator', '0031_rating_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='comments',
            field=models.TextField(blank=True, null=True),
        ),
    ]