from django.db import models
from django.urls import reverse


# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    closet_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.closet_name}"


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    image_url = models.URLField()
    bin = models.ForeignKey(BinVO,
                            related_name="shoes",
                            on_delete=models.CASCADE)

    def get_api_url(self):
        return reverse("show_shoe", kwargs={
            "id": self.id,
        })
