from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm, TaskForm
from .models import Task


# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    tasks = Task.objects.filter(user=request.user)
    return render(request, "tasks/index.html", {
        "tasks": tasks
    })

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "tasks/login.html",
                          {"message": "Invalid username or password."})

    return render(request, "tasks/login.html")

def logout_view(request):
    logout(request)
    return render(request, "tasks/login.html", {
        "message": "You have successfully logged out."
    })
def register_view(request):
    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse("login"))


    return render(request, "tasks/register.html", {
        "form": form
    })

def add(request):
    form = TaskForm()
    if request.method == "POST":
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            return HttpResponseRedirect(reverse("index"))

    return render(request, "tasks/add.html", {
        "form" : form
    })

def delete(request, id):
    pass