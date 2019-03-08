# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from tinymce.models import HTMLField
from django.conf import settings
from geoposition.fields import GeopositionField

class Journey(models.Model):
    published = models.BooleanField(default=False)
    title = models.CharField(max_length=1024)
    budget = models.DecimalField(max_digits=20, decimal_places=2)
    budget_min = models.DecimalField(max_digits=20, decimal_places=2)
    budget_max = models.DecimalField(max_digits=20, decimal_places=2)
    people_count = models.IntegerField()
    duration = models.IntegerField()
    location = GeopositionField()
    description = HTMLField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="journeys",
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Milestone(models.Model):
    title = models.CharField(max_length=1024)
    duration = models.PositiveSmallIntegerField(default=0)
    position = models.PositiveSmallIntegerField(default=0)
    location = GeopositionField()
    description = HTMLField()
    journey = models.ForeignKey(
        'Journey',
        related_name="milestones",
        on_delete=models.CASCADE
    )
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
    journey = models.ForeignKey(
        Journey,
        related_name="transits",
        on_delete=models.CASCADE
    )
    # start_milestone = models.OneToOneField(
    #     Milestone,
    #     primary_key=True,
    #     related_name="start_milestone_of",
    #     on_delete=models.CASCADE
    # )
    # end_milestone = models.OneToOneField(
    #     Milestone,
    #     primary_key=True,
    #     related_name="end_milestone_of",
    #     on_delete=models.CASCADE
    # )
    price = models.DecimalField(max_digits=20, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.start_milestone} - {self.end_milestone}"
