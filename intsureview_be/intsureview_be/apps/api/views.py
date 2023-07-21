from django.contrib.auth.models import User, Group
from intsureview_be.apps.api.models import Order
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from intsureview_be.apps.api.serializers import (
    UserSerializer,
    GroupSerializer,
    OrderSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows orders to be viewed or edited.
    """

    allowed_methods = ["GET", "POST", "DELETE"]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def list(self, request):
        # retrive the queryset of all Order objects
        orders = self.queryset

        # serialize the queryset using the OrderSerializer
        serializer = self.serializer_class(orders, many=True)

        # return the serialized data as JSON response
        return Response(serializer.data)

    # looks like there might be a slight delay in saving the database
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            instance = Order.objects.get(pk=pk)
            instance.delete()

            # delete all orders
            # Order.objects.all().delete()

            return Response(
                {"message": "Successfully deleted."}, status=status.HTTP_200_OK
            )
        except Order.DoesNotExist:
            return Response(
                {"message": "Order not found."}, status=status.HTTP_400_BAD_REQUEST
            )
