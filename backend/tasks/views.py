from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from .forms import CreateUserForm, TaskForm
from .models import Task
from .serializers import *

from django.http import JsonResponse
from django.middleware.csrf import get_token
import json
# Create your views here.


# def index(request):
#     if not request.user.is_authenticated:
#         return HttpResponseRedirect(reverse("login"))
#     tasks = MyTask.objects.filter(user=request.user)
#     return render(request, "tasks/index.html", {
#         "tasks": tasks
#     })
#
# def login_view(request):
#     if request.method == "POST":
#         username = request.POST.get("username")
#         password = request.POST.get("password")
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return HttpResponseRedirect(reverse("index"))
#         else:
#             return render(request, "tasks/login.html",
#                           {"message": "Invalid username or password."})
#
#     return render(request, "tasks/login.html")
#
# def logout_view(request):
#     logout(request)
#     return render(request, "tasks/login.html", {
#         "message": "You have successfully logged out."
#     })
# def register_view(request):
#     form = CreateUserForm()
#     if request.method == "POST":
#         form = CreateUserForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect(reverse("login"))
#
#
#     return render(request, "tasks/register.html", {
#         "form": form
#     })
#
# def add(request):
#     form = TaskForm()
#     if request.method == "POST":
#         form = TaskForm(request.POST)
#         if form.is_valid():
#             task = form.save(commit=False)
#             task.user = request.user
#             task.save()
#             return HttpResponseRedirect(reverse("index"))
#
#     return render(request, "tasks/add.html", {
#         "message" : "Add MyTask",
#         "form" : form
#     })
#
# def delete(request, id):
#     if request.method == "POST":
#         task = MyTask.objects.get(pk=id, user=request.user)
#         task.delete()
#         return HttpResponseRedirect(reverse("index"))
#     return HttpResponseRedirect(reverse("index"))
#
# def update(request, id):
#     form = TaskForm(instance=MyTask.objects.get(pk=id))
#     if request.method == "POST":
#         new_form = TaskForm(request.POST, instance=form.instance)
#         if new_form.is_valid():
#             new_form.save()
#             return HttpResponseRedirect(reverse("index"))
#
#     return render(request, "tasks/add.html", {
#         "message": "Update MyTask",
#         "form" : form
#     })

class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

def csrf_token_view(request):
    """
    Provides a CSRF token to the frontend.
    """
    return JsonResponse({'csrfToken': get_token(request)})


 # Skip CSRF check for simplicity (not recommended for production)
def login_view(request):
    if request.method == "POST":
        # Parse JSON data from the request body
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in (set session data)
            login(request, user)
            return JsonResponse({"message": "Login successful!"}, status=200)
        else:
            # Invalid credentials
            return JsonResponse({"error": "Invalid username or password."}, status=400)

    return JsonResponse({"error": "POST request required."}, status=400)