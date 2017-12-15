from rest_framework.serializers import HyperlinkedModelSerializer
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'last_login',
            'date_joined'
        )

class ProfileSerializer(HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = (
            'view',
            'user'
        )
