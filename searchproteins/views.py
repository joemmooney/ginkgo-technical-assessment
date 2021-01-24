import os
from Bio import Entrez
from Bio import SeqIO
from Bio.Seq import Seq
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django_q.tasks import async_task
from .serializers import SearchProteinsSerializer
from .models import SearchProteins
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View

protein_list = ['NC_000852', 'NC_007346', 'NC_008724', 'NC_009899', 'NC_014637', 'NC_020104', 'NC_023423', 'NC_023640', 'NC_023719', 'NC_027867']

# Create your views here.
class SearchProteinsView(viewsets.ModelViewSet):
    serializer_class = SearchProteinsSerializer
    queryset = SearchProteins.objects.all()
    
    @action(detail=True, methods=['get'], name='Search Proteins')
    def searchProteins(self, request, pk=None):
        instance = self.get_object()
        dna_string = instance.dnasequence
        try:
            allowed_chars = set("ACGT")
            if (not set(dna_string) <= allowed_chars):
                serializer =  SearchProteinsSerializer(instance, data={ 'dnasequence': dna_string, 'status': 'Fail: Input is invalid DNA sequence' })
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status = status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            Entrez.email = 'joe.m.mooney@gmail.com'

            for protein in protein_list:
                handle = Entrez.efetch(db="nucleotide", id=protein, rettype="fasta", retmode="text")
                for record in SeqIO.parse(handle, "fasta"):
                    location = record.seq.find(dna_string)
                    if (not location == -1):
                        serializer = SearchProteinsSerializer(instance, data={ 'dnasequence': dna_string, 'status': 'Complete', 'match': protein + " position " + str(location) })
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data, status = status.HTTP_201_CREATED)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer = SearchProteinsSerializer(instance, data={ 'dnasequence': dna_string, 'status': 'Complete' })
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            serializer = SearchProteinsSerializer(instance, data={ 'dnasequence': dna_string, 'status': 'Fail: Error occured' })
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()