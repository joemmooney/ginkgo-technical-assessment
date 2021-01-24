from rest_framework import serializers
from .models import SearchProteins

class SearchProteinsSerializer(serializers.ModelSerializer):
  class Meta:
    model = SearchProteins
    fields = ('dnasequence', 'status', 'match')