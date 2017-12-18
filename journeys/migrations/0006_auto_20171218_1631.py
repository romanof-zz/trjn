# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-18 16:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('journeys', '0005_auto_20171215_1814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transit',
            name='end_milestone',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='end_milestone_of', to='journeys.Milestone'),
        ),
    ]
