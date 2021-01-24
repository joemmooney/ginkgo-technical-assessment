from django.contrib import admin
from .models import SearchProteins

# Register your models here.
class SearchProteinsAdmin(admin.ModelAdmin):
  list_display = ('dnasequence', 'status', 'match')

admin.site.register(SearchProteins, SearchProteinsAdmin)