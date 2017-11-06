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

class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('title', 'journey', 'position', 'duration', 'updated_at')

class TransitAdmin(admin.ModelAdmin):
    list_display = ('journey', 'transit_type', 'start_milestone', 'end_milestone', 'updated_at')

# Register your models here.
admin.site.register(Journey, JourneyAdmin)
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(Transit, TransitAdmin)
