# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def user_created(sender, instance, **kwargs):
    if not instance.user_profile.first():
        Profile.objects.create(user=instance)

class Profile(models.Model):
    user = models.ForeignKey(User, related_name="user_profile", on_delete=models.CASCADE)
    bio = models.CharField(max_length=1024)
    picture = models.CharField(max_length=1024)

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
