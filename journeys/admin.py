# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.forms import ModelForm, HiddenInput
from .models import (Journey, Milestone, Transit)
import nested_admin

class MilestoneAdminForm(ModelForm):
    class Meta:
        fields = ['title', 'position', 'duration', 'location', 'description']
        model = Milestone
        widgets = {
            'position': HiddenInput()
        }

class MilestoneAdmin(nested_admin.NestedStackedInline):
    model = Milestone
    form = MilestoneAdminForm
    ordering = ('position',)
    sortable_field_name = 'position'
    classes = ('collapse',)
    extra = 0

class TransitAdmin(nested_admin.NestedStackedInline):
    model = Transit
    classes = ('collapse',)
    extra = 0

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name in ['start_milestone', 'end_milestone']:
            try:
                kwargs["queryset"] = Milestone.objects.filter(journey__id=int(request.path.split('/')[4]))
            except ValueError:
                kwargs["queryset"] = Milestone.objects.none()
        return super(TransitAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)

class JourneyAdmin(nested_admin.NestedModelAdmin):
    inlines = [MilestoneAdmin, TransitAdmin]
    list_display = ('title', 'author', 'published', 'updated_at')
    exclude = ('author',)

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super(JourneyAdmin, self).save_model(request, obj, form, change)

    def get_queryset(self, request):
        qs = super(JourneyAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(author=request.user)

# Register your models here.
admin.site.register(Journey, JourneyAdmin)
