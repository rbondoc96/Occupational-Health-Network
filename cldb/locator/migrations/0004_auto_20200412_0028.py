# Generated by Django 3.0.5 on 2020-04-12 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locator', '0003_auto_20200412_0010'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ServiceCategories',
            new_name='ServiceCategory',
        ),
        migrations.AddField(
            model_name='rating',
            name='comments',
            field=models.CharField(default='', max_length=255),
        ),
    ]
