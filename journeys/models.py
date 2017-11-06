# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from tinymce.models import HTMLField
from django.conf import settings

class Journey(models.Model):
    title = models.CharField(max_length=1024)
    people_count = models.IntegerField()
    budget = models.DecimalField(max_digits=20, decimal_places=2)
    budget_min = models.DecimalField(max_digits=20, decimal_places=2)
    budget_max = models.DecimalField(max_digits=20, decimal_places=2)
    duration = models.IntegerField()
    description = HTMLField()
    location = models.CharField(max_length=1024)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="journey_author", on_delete=models.CASCADE)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Milestone(models.Model):
    title = models.CharField(max_length=1024)
    location = models.CharField(max_length=1024)
    description = HTMLField()
    duration = models.IntegerField()
    position = models.IntegerField()
    journey = models.ForeignKey('Journey', related_name="milestone_journey", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Transit(models.Model):
    SUPPORTED_TRANSIT_TYPES = (
        (0, "walk"),
        (1, "public transport"),
        (2, "private transport"),
        (3, "airplane")
    )
    transit_type = models.IntegerField(choices=SUPPORTED_TRANSIT_TYPES, default=1)
    journey = models.ForeignKey('Journey', related_name="transit_journey", on_delete=models.CASCADE)
    start_milestone = models.ForeignKey('Milestone', related_name="transit_start_milestone", on_delete=models.PROTECT)
    end_milestone = models.ForeignKey('Milestone', related_name="transit_end_milestone", on_delete=models.PROTECT)
    description = models.TextField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.start_milestone} - {self.end_milestone}"
