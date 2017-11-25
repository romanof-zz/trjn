from rest_framework.serializers import HyperlinkedModelSerializer
from django.contrib.auth.models import User
from .models import (Identity, Profile)

class IdentitySerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Identity
        fields = (
            'provider',
            'external_id',
        )

class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'last_login',
            'date_joined'
        )

class ProfileSerializer(HyperlinkedModelSerializer):
    user = UserSerializer()
    identities = IdentitySerializer(many=True)

    class Meta:
        model = Profile
        fields = (
            'bio',
            'picture',
            'user',
            'identities',
        )
