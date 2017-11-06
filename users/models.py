# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.conf import settings

class Identity(models.Model):
    provider = models.CharField(max_length=20)
    external_id = models.CharField(max_length=200)
    picture = models.CharField(max_length=1024)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="identity_user", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
