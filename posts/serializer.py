from rest_framework.serializers import HyperlinkedModelSerializer
from .models import (Post)
from users.serializer import UserSerializer

class PostSerializer(HyperlinkedModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = (
            'id',
            'front_image_url',
            'title',
            'text',
            'author',
            'created_at',
            'updated_at'
        )
