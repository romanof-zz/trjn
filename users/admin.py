# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (Identity, Profile)
import nested_admin

class IdentityAdmin(nested_admin.NestedStackedInline):
    model = Identity
    classes = ('collapse',)
    extra = 0

class ProfileAdmin(nested_admin.NestedModelAdmin):
    inlines = [IdentityAdmin]
    list_display = ('user', 'bio')

    def get_queryset(self, request):
        qs = super(ProfileAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

# Register your models here.
admin.site.register(Profile, ProfileAdmin)
