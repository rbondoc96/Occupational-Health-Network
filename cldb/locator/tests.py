from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Location, Review

User = get_user_model()

# pylint: disable=no-member

class LocationTestCase(TestCase):
    def setUp(self):
        self.user = User(username="thisUsername", password="somepassword")
        self.location = Location.objects.all()

    def test_user_created(self):
        self.assertEqual(self.user.username, "thisUsername")

    def test_review_submitted(self):
        print(self.location)
        review = Review.objects.create(location=self.location, author=self.user, like=True, dislike=False, comments="She was a dumb bootlicker")

        self.assertEqual(review.author, self.user)