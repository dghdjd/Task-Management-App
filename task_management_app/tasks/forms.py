from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User
from tasks.models import Task


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name','last_name','password1', 'password2']

class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description']