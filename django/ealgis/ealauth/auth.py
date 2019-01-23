from django.contrib.auth.models import User
from .admin import is_private_site
from .models import Profile

def approve_profile(strategy, backend, uid, response, details, user, social, *args, **kwargs):
    if backend.name == 'custom' and is_private_site() is True:
        if Profile.objects.filter(user=user).exists():
            Profile.objects.filter(user=user).update(is_approved=True)
