#!/usr/bin/env python

from rest_framework import status
from rest_framework.response import Response

class LocationQueryParameterMixin(object):
    def get_queryset(self):
        queryset = self.queryset
        location_id = self.request.query_params.get("locationId", None)
        
        if location_id is not None:
            queryset = queryset.filter(location=location_id)
            if queryset.exists() and queryset != []:
                return queryset.filter(location=location_id)
        else:
            return queryset.order_by("location")

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset.exists() or queryset == []:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer_class()(queryset, many=True)
        return Response(serializer.data)

class ManagerCUDAuthorizationMixin(object):
    def create(self, request):
        user_groups = self.request.user.groups.all()

        if (user_groups.filter(name="manager").exists() and \
            user_groups.filter(name="manager") != "") or \
            self.request.user.is_staff:
            
            serializer = self.get_serializer_class()(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data, 
                    status=status.HTTP_201_CREATED
                )
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            print("in here")
            return Response({}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        user_groups = self.request.user.groups.all()

        if (user_groups.filter(name="manager").exists() and \
            user_groups.filter(name="manager") != "") or \
            self.request.user.is_staff:

            instance = self.get_object()
            
            serializer = self.get_serializer_class()(
                instance,
                data=request.data,
                partial=partial,
            )

            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data, 
                    status=status.HTTP_200_OK
                )
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        user_groups = self.request.user.groups.all()

        if (user_groups.filter(name="manager").exists() and \
            user_groups.filter(name="manager") != "") or \
            self.request.user.is_staff:

            obj = self.get_object()
            obj.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({}, status=status.HTTP_403_FORBIDDEN)