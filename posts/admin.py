# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (Post, Tag)

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published', 'updated_at')
    exclude = ('author',)

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super(PostAdmin, self).save_model(request, obj, form, change)

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'post_count')
    exclude = ('post_count',)

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Tag, TagAdmin)
