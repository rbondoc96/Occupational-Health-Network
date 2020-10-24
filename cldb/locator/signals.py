import os

from django.conf import settings
from django.dispatch import receiver
from django.db import IntegrityError
from django.utils.text import slugify
from django.db.models.signals import post_save

from locator.models import Location

@receiver(post_save, sender=Location)
def create_slug(sender, instance, created, *args, **kwargs):
    if created or instance.slug is None:
        name = instance.name + "-" + instance.branch_name \
            if instance.branch_name \
                else instance.name + str(instance.id)

        slug = slugify(name)
        instance.slug = slug   

        try:
            instance.save()
        except IntegrityError:
            instance.slug = instance.slug + "-" + str(instance.id)
            instance.save()

