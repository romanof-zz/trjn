# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (Journey, Milestone, Transit)

# Register your models here.
admin.site.register(Journey)
admin.site.register(Milestone)
admin.site.register(Transit)
