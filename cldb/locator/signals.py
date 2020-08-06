import os

from django.conf import settings
from django.dispatch import receiver
from django.db import IntegrityError
from django.utils.text import slugify
from django.db.models.signals import post_save

from locator.models import Location

# Fix, doesn't run!
@receiver(post_save, sender=Location)
def create_slug(sender, instance, created, *args, **kwargs):
    print("here")
    if created or instance.slug is None:
        if instance.branch_name != "" and instance.branch_name != None:
            full_name = instance.name + " " + instance.branch_name
        else:
            full_name = instance.name
        instance.slug = slugify(full_name)
        print("before")

        try:
            super().save(*args, **kwargs)
        except IntegrityError:
            instance.slug = instance.slug + "-" + instance.id
            super().save(*args, **kwargs)

        print("after")
        print(instance.slug)
