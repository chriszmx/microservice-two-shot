from django.urls import path
from .views import api_list_hats, api_hat_details


urlpatterns = [
    path("hats/", api_list_hats, name="api_list_hats"),
    path("hats/<int:id>/", api_hat_details, name="api_hat_details"),
]
