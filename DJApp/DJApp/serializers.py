from rest_framework import serializers
from .models import PeopleModel

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeopleModel
        fields = ('name','email')
        