from django.urls import path
from .views import list_shoes, show_shoe


urlpatterns = [
    path('bins/<int:bin_vo_id>/shoes/', list_shoes, name='list_shoes'),
    path('shoes/', list_shoes, name='list_shoes'),
    path('shoes/<int:id>/', show_shoe, name='show_shoe'),
]
