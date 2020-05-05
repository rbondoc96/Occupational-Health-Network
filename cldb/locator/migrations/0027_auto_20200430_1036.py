# Generated by Django 3.0.5 on 2020-04-30 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locator', '0026_auto_20200423_2113'),
    ]

    operations = [
        migrations.AddField(
            model_name='daytimerange',
            name='end_time',
            field=models.TimeField(default='12:00 AM', verbose_name='End Time'),
        ),
        migrations.AddField(
            model_name='daytimerange',
            name='start_time',
            field=models.TimeField(default='12:00 AM', verbose_name='Start Time'),
        ),
        migrations.AddField(
            model_name='servicetimerange',
            name='end_time',
            field=models.TimeField(default='12:00 AM', verbose_name='End Time'),
        ),
        migrations.AddField(
            model_name='servicetimerange',
            name='start_time',
            field=models.TimeField(default='12:00 AM', verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='daytimerange',
            name='day',
            field=models.CharField(choices=[('', ''), (0, 'Sun'), (1, 'Mon'), (2, 'Tue'), (3, 'Wed'), (4, 'Thu'), (5, 'Fri'), (6, 'Sat')], default='Mon', max_length=3),
        ),
        migrations.AlterField(
            model_name='location',
            name='state',
            field=models.CharField(choices=[('', ''), ('AL', 'AL'), ('AK', 'AK'), ('AR', 'AR'), ('AZ', 'AZ'), ('CA', 'CA'), ('CO', 'CO'), ('CT', 'CT'), ('DC', 'DC'), ('DE', 'DE'), ('FL', 'FL'), ('GA', 'GA'), ('HI', 'HI'), ('IA', 'IA'), ('ID', 'ID'), ('IL', 'IL'), ('IN', 'IN'), ('KS', 'KS'), ('KY', 'KY'), ('LA', 'LA'), ('MA', 'MA'), ('MD', 'MD'), ('ME', 'ME'), ('MI', 'MI'), ('MN', 'MN'), ('MO', 'MO'), ('MS', 'MS'), ('MT', 'MT'), ('NC', 'NC'), ('NE', 'NE'), ('NH', 'NH'), ('NJ', 'NJ'), ('NM', 'NM'), ('NV', 'NV'), ('NY', 'NY'), ('ND', 'ND'), ('OH', 'OH'), ('OK', 'OK'), ('OR', 'OR'), ('PA', 'PA'), ('RI', 'RI'), ('SC', 'SC'), ('SD', 'SD'), ('TN', 'TN'), ('TX', 'TX'), ('UT', 'UT'), ('VT', 'VT'), ('VA', 'VA'), ('WA', 'WA'), ('WI', 'WI'), ('WV', 'WV'), ('WY', 'WY')], default='', max_length=2),
        ),
    ]
