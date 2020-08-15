from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db import models

from locator.models import Location

# pylint: disable=no-member

# Add a "user type" of "patient", "employer", "clinic personnel" to dictate 
# review type. Delete other review type table

class UserType(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name="User Type",
    )

    def __str__(self):
        return f"User Type: {self.name}"

    class Meta:
        verbose_name = "User Type"

class Profile(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete = models.CASCADE,
    )
    user_type = models.ForeignKey(
        UserType,
        on_delete=models.CASCADE,
        verbose_name="User Type",
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.user.username} - Profile"

    class Meta:
        ordering = ["user"]

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