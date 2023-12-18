# myapp/urls.py

from django.urls import path
from .views import LoginView, UserRegistrationView, ProductList

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('products/', ProductList.as_view(), name='product-list'),
]
