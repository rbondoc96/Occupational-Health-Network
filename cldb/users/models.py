from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db import models

from locator.models import Location

# pylint: disable=no-member

# Add a "user type" of "patient", "employer", "clinic personnel" to dictate 
# review type. Delete other review type table

class Profile(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete = models.CASCADE,
    )
    image = models.ImageField(
        default="default_user.jpg",
        upload_to="profile_pics"
    )

    def __str__(self):
        return f"{self.user.username} Profile"

class Bookmark(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"[{self.owner}] - {self.location} "

    class Meta:
        verbose_name = "Bookmark"
        ordering = ["owner"]