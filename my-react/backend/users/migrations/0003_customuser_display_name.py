# Generated by Django 4.2 on 2024-12-19 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_customuser_avatar_customuser_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='display_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
