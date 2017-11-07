# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from .models import (Journey, Milestone, Transit)
from .serializer import (JourneyGeoSerializer, MilestoneGeoSerializer, TransitSerializer)
from rest_framework.response import Response
from django.forms import ValidationError

class JourneyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Journey.objects.all().order_by('-updated_at')
    serializer_class = JourneyGeoSerializer

class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneGeoSerializer

    def list(self, request):
        jid = self.request.query_params.get('journey_id', None)
        if not jid: return Response({'error': 'journey_id is required.'}, status=400)

        queryset = Milestone.objects.filter(journey__id=jid).order_by('position')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TransitViewSet(viewsets.ViewSet):
    queryset = Transit.objects.none()

    def list(self, request):
        jid = self.request.query_params.get('journey_id', None)
        if not jid: return Response({'error': 'journey_id is required.'}, status=400)

        queryset = Transit.objects.filter(journey__id=jid)
        serializer = TransitSerializer(queryset, many=True)
        return Response(serializer.data)
