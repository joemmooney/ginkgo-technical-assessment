from django.db import models

# Create your models here.

class SearchProteins(models.Model):
  dnasequence = models.TextField(primary_key=True, verbose_name='DNA Sequence')
  status = models.TextField(default="Running", verbose_name='Status')
  match = models.TextField(default="None", verbose_name='Match')

  def _str_(self):
    return self.dnasequence