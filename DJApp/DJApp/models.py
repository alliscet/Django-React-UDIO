from django.db import models

class PeopleModel(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)