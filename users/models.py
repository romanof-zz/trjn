# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    picture = models.CharField(max_length=1024)
    bio = models.CharField(max_length=1024)
    user = models.ForeignKey(User, related_name="profile_user", on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Identity(models.Model):
    provider = models.CharField(max_length=20)
    external_id = models.CharField(max_length=200)
    profile = models.ForeignKey(Profile, related_name="identities", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.provider
