from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import ModelSerializer
from .models import (Journey, Milestone, Transit)

class JourneyGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Journey
        geo_field = "location"
        fields = (
            'id',
            'title',
            'budget',
            'budget_min',
            'budget_max',
            'people_count',
            'duration',
            'description',
            'author',
            'created_at',
            'updated_at'
        )

class MilestoneGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Milestone
        geo_field = "location"
        fields = (
            'id',
            'title',
            'duration',
            'position',
            'description',
            'journey',
            'created_at',
            'updated_at'
        )

class TransitSerializer(ModelSerializer):
    class Meta:
        model = Transit
        fields = (
            'id',
            'transit_type',
            'start_milestone',
            'end_milestone',
            'description',
            'journey',
            'price',
            'created_at',
            'updated_at'
        )
