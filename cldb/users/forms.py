from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
    # email is a extra field
    email = forms.EmailField(

    )

    # Meta: a "nested namespace" for configurations.
    # keeps it all in once place!
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]