from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User, Group
from django.dispatch import receiver

from users.models import User, Profile

# @receiver(post_save, sender=User):
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         profile = Profile.objects.create(
#             user=instance,
#             user_type="",
            
#         )


# @receiver(post_save, sender=User)
# def add_team_permission(sender, instance, created, **kwargs):
#     if created:
#         group = Group.objects.get(name="team member")
#         group.user_set.add(instance)


# @receiver(post_save, sender=User)
# def send_confirmation_email(sender, instance, created, **kwargs):
#     print("hi")