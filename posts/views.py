# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from .models import (Post)
from .serializer import (PostSerializer)
from rest_framework.response import Response

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request):
        uid = self.request.query_params.get('author', None)
        if not uid: return Response({'error': 'author is required.'}, status=400)

        queryset = Post.objects.filter(author__id=uid, published=True).order_by('-updated_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
