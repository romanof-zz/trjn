# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (Journey, Milestone, Transit)

class JourneyAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published', 'updated_at')
    exclude = ('author',)

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super(JourneyAdmin, self).save_model(request, obj, form, change)

    def get_queryset(self, request):
        qs = super(JourneyAdmin, self).get_queryset(request)
        print(qs)
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('title', 'journey', 'position', 'duration', 'updated_at')
    ordering = ('journey', 'position')

    def get_queryset(self, request):
        qs = super(MilestoneAdmin, self).get_queryset(request)
        print(qs)
        if request.user.is_superuser:
            return qs

        journeys = Journey.objects.filter(author=request.user)
        return qs.filter(journey=journeys)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'journey':
            if not request.user.is_superuser:
                kwargs["queryset"] = Journey.objects.filter(
                    author=request.user)
        return super(MilestoneAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)

class TransitAdmin(admin.ModelAdmin):
    list_display = ('journey', 'transit_type', 'start_milestone', 'end_milestone', 'updated_at')

    def get_queryset(self, request):
        qs = super(TransitAdmin, self).get_queryset(request)
        print(qs)
        if request.user.is_superuser:
            return qs

        journeys = Journey.objects.filter(author=request.user)
        return qs.filter(journey=journeys)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'journey':
            if not request.user.is_superuser:
                kwargs["queryset"] = Journey.objects.filter(
                    author=request.user)
        return super(TransitAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)

# Register your models here.
admin.site.register(Journey, JourneyAdmin)
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(Transit, TransitAdmin)
