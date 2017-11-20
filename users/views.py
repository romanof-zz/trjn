# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import (Profile)
from .serializer import (ProfileSerializer)
from rest_framework.response import Response

class ProfileViewSet(viewsets.ViewSet):
    queryset = Profile.objects.none()

    def retrieve(self, request, pk=None):
        profile = get_object_or_404(Profile, user__username=pk)
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
