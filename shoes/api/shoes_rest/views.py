from django.http import JsonResponse, HttpResponse
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


# shoes = Shoe.objects.select_related('bin').all()


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'import_href',
        'closet_name',
        # 'id',
    ]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'manufacturer',
        'model_name',
        'color',
        'image_url',
        'bin',
        # 'id',
    ]
    encoders = {
        'bin': BinVOEncoder(),
    }

    def get_extra_data(self, o):
        return super().get_extra_data(o)


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        'manufacturer',
        'model_name',
        'color',
        'image_url',
        'bin',
        # 'id',
    ]
    encoders = {
        'bin': BinVOEncoder(),
    }

    def get_extra_data(self, o):
        return super().get_extra_data(o)


@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = f'/api/bins/{bin_vo_id}/'
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "NOT VALID"}
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(shoe, encoder=ShoeListEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def show_shoe(request, id):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id)
            return JsonResponse(shoe, encoder=ShoeDetailEncoder, safe=False)
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "INVALID"})
    else:
        count, _ = Shoe.objects.filter(id).delete()
        return JsonResponse({"deleted": count > 0})
