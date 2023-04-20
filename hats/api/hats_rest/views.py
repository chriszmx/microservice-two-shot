from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Hat
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from .models import LocationVO

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href"]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "fabric",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }

    def get_extra_data(self, o):
        return super().get_extra_data(o)

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "fabric",
        "color",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }
    def get_extra_data(self, o):
        return super().get_extra_data(o)

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method =="GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location = LocationVO.objects.get(id=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_hat_details(request, id):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=id)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            hat = Hat.objects.get(id=id)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            hat = Hat.objects.get(id=id)

            props = ["fabric", "style_name", "color", "picture_url"]
            for prop in props:
                if prop in content:
                    setattr(hat, prop, content[prop])
            hat.save()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
