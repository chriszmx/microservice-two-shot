from django.contrib import admin
from .models import Bin
from .models import Location


# Register your models here.
@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
