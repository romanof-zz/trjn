# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializer import (UserSerializer)
from rest_framework.response import Response

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.none()

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, username=pk)

        serializer = UserSerializer(user)
        return Response(serializer.data)
