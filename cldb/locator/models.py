#!/usr/bin/env python

from django.db import models

# One-to-Many Relationships
#   1. User <-> Rating
#       A user will have submitted multiple ratings
#       A rating can only have one user
#   2. User <-> Location
#       A user will have updated multiple locations
#       A location can only have one person who updated it at a time
#   3. Location <-> ServiceTimeRange
#       A location has many ServiceTimeRanges
#       A ServiceTimeRange can only belong to 1 location
#   4. Location <-> DayTimeRange
#       A location has many DayTimeRanges
#       A DayTimeRange can only belong to 1 location
#   5. Service <-> ServiceCategory
#       A ServiceCategory can belong to many Services
#       A Service can only belong to 1 ServiceCategory

# Many-to-Many Relationships
#   1. Location <-> Service
#       Each service can be offered by more than one location
#       Each location offers many services
#   2. Location <-> DrugScreenMethod
#       A Location can have many DS Auth options to authorize drug screens
#       A DrugScreenMethod can be assigned to many Location objects
#   3. Location <-> AuthMethod
#       A Location may accept different AuthMethods
#       An AuthMethod can be used at different Locations

class ServiceCategory(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

class LocationCategory(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name

# Ex. Electronic, Paper, Alter
class CcfCategory(models.Model):
    name = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.name

# Ex. Aya, EScreen, Mobile Health
class AuthMethod(models.Model):
    name = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.name

# Ex. LabCorp(Electronic), LabCorp(Alter)
class DrugScreenMethod(models.Model):
    ccf_category = models.ForeignKey(CcfCategory,
    on_delete=models.SET_NULL, blank=True, null=True)

    name = models.CharField(max_length=16)

    def __str__(self):
        return self.name

class Service(models.Model):
    # In the event a ServiceCategory is deleted, the Service itself
    # won't be deleted, just uncategorized
    service_category = models.ForeignKey(ServiceCategory,
    on_delete=models.SET_NULL, blank=True, null=True)

    name = models.CharField(max_length=30, unique=True)

    # Expected that cost of service will not exceed $999.99
    cost = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name

class Location(models.Model):
    # If a LocationCategory is deleted, the Location will still remain,
    # but it will be uncategorized
    location_category = models.ForeignKey(LocationCategory,
    on_delete=models.SET_NULL, blank=True, null=True)

    name = models.CharField(max_length=70)
    branch_name = models.CharField(max_length=30)
    street_line_1 = models.CharField(max_length=50)
    street_line_2 = models.CharField(max_length=35)
    city = models.CharField(max_length=45)
    state = models.CharField(max_length=2)
    zipcode = models.CharField(max_length=10)

    # 25 characters allows for an extension substring "ext. #####"
    phone = models.CharField(max_length=25, default='')
    fax = models.CharField(max_length=14, default='')
    website = models.TextField(blank=True)

    comments = models.TextField(blank=True)
    last_updated = models.DateTimeField('last updated')

    service_list = models.ManyToManyField(Service)
    auth_method_list = models.ManyToManyField(AuthMethod)
    ds_method_list = models.ManyToManyField(DrugScreenMethod)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'branch_name'],
            name='location_name_branch_name_key')
        ]
    
    def __str__(self):
        if self.branch_name == "":
            return self.name
        else:
            return f"{self.name} - {self.branch_name}"
    

class ServiceTimeRange(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    name = models.CharField(max_length=30)
    start_time = models.TimeField('time start')
    end_time = models.TimeField('time end')

    def __str__(self):
        return f'{self.name}: {self.start_time} - {self.end_time}'

class DayTimeRange(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    # Only using 3 letter days (Mon/Tue/Wed/Thu/Fri/Sat/Sun)
    day = models.CharField(max_length=3)
    open_time = models.TimeField('time open')
    close_time = models.TimeField('time closed')

    def __str__(self):
        return f'{self.day}: {self.open_time} - {self.close_time}'

class Rating(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    rating = models.IntegerField(default=0)
    comments = models.CharField(max_length=255, default="", blank=True)
    datetime_submitted = models.DateTimeField('datetime submitted')

class Contacts(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    name = models.CharField(max_length=35)
    title = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(max_length=320, blank=True, null=True)
    phone = models.CharField(max_length=25, blank=True, null=True)    

class User(models.Model):
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    rating = models.ForeignKey(Rating, on_delete=models.PROTECT)

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


