from django.contrib.auth.models import User, Group
from intsureview_be.apps.api.models import Order
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "name",
            "phone_number",
            "is_text_enabled",
            "pickup_date",
            "pickup_time",
            "created_at",
        ]
