# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (Identity, Profile)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio')
    exclude = ('identities',)

class IdentityAdmin(admin.ModelAdmin):
    list_display = ('provider', 'external_id')

# Register your models here.
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Identity, IdentityAdmin)
