from django.urls import path
from .views import LoginView, UserRegistrationView, ProductList, OrderListCreateView, OrderDetailView, send_password_reset_email

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('products/', ProductList.as_view(), name='product-list'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('send-password-reset-email/', send_password_reset_email, name='send_password_reset_email'),
]
