# Generated by Django 3.0.8 on 2020-08-05 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locator', '0045_auto_20200805_1410'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='auth_method_list',
            field=models.ManyToManyField(blank=True, null=True, to='locator.AuthMethod', verbose_name='Authorization Methods Accepted'),
        ),
        migrations.AlterField(
            model_name='location',
            name='ccf_category_list',
            field=models.ManyToManyField(blank=True, null=True, to='locator.CcfCategory', verbose_name='UDS Chain of Custody Forms Accepted'),
        ),
        migrations.AlterField(
            model_name='location',
            name='date_created',
            field=models.DateField(auto_now_add=True, verbose_name='Date Created'),
        ),
    ]