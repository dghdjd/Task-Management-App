from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import *

# urlpatterns = [
#     path("index", views.index, name="index"),
#     path("login", views.login_view, name="login"),
#     path("register", views.register_view, name="register"),
#     path("logout", views.logout_view, name="logout"),
#     path("add", views.add, name="add"),
#     path("delete/<int:id>", views.delete, name="delete"),
#     path("update/<int:id>", views.update, name="update"),
# ]

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')  # URL for tasks
router.register(r'users', UserViewSet, basename='user')  # URL for users (optional)
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Get token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('api/login/', login_view, name='login'),
]