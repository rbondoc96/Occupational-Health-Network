from django.contrib.auth.models import User
from django.db import models

# Create your models here.
# pylint: disable=no-member

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete = models.CASCADE,
    )
    image = models.ImageField(
        default="default_user.jpg",
        upload_to="profile_pics"
    )

    def __str__(self):
        return f"{self.user.username} Profile"