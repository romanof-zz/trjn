# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.conf import settings

class Journey(models.Model):
    title = models.CharField(max_length=1024)
    people_count = models.IntegerField()
    budget = models.DecimalField(max_digits=20, decimal_places=2)
    budget_min = models.DecimalField(max_digits=20, decimal_places=2)
    budget_max = models.DecimalField(max_digits=20, decimal_places=2)
    duration = models.IntegerField()
    description = models.TextField()
    location = models.CharField(max_length=1024)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="journey_author", on_delete=models.CASCADE)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Milestone(models.Model):
    title = models.CharField(max_length=1024)
    location = models.CharField(max_length=1024)
    description = models.TextField()
    duration = models.IntegerField()
    position = models.IntegerField()
    journey = models.ForeignKey('Journey', related_name="milestone_journey", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Transit(models.Model):
    transit_type = models.IntegerField()
    start_milestone = models.ForeignKey('Milestone', related_name="transit_start_milestone", on_delete=models.PROTECT)
    end_milestone = models.ForeignKey('Milestone', related_name="transit_end_milestone", on_delete=models.PROTECT)
    journey = models.ForeignKey('Journey', related_name="transit_journey", on_delete=models.CASCADE)
    description = models.TextField()
    position = models.IntegerField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
