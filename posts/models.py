# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from django.db import models
from django.db.models.signals import (m2m_changed, pre_save)
from django.dispatch import receiver
from tinymce.models import HTMLField

class Post(models.Model):
    title = models.CharField(max_length=1024)
    text = HTMLField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="post_author", on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

@receiver(m2m_changed, sender=Post.tags.through)
def tags_changed(sender, **kwargs):
    action = kwargs.pop('action', None)
    for tid in kwargs.pop('pk_set', None):
        tag = Tag.objects.get(pk=tid)
        if action == 'pre_add':
            tag.post_count += 1
        elif action in ['pre_remove', 'pre_clear']:
            tag.post_count -= 1
        tag.save()

class Tag(models.Model):
    name = models.CharField(max_length=1024)
    post_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
