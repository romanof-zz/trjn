from django.conf.urls import (url, include)
from django.contrib import admin
from journeys.views import (JourneyViewSet, MilestoneViewSet, TransitViewSet)
from posts.views import (PostViewSet)
from users.views import (UserViewSet)
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'journeys', JourneyViewSet)
router.register(r'milestones', MilestoneViewSet)
router.register(r'transits', TransitViewSet)
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^tinymce/', include('tinymce.urls')),
    url(r'^nested_admin/', include('nested_admin.urls')),
]
