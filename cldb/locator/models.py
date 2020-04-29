#!/usr/bin/env python

from django.db import models

from .vars import DayTime, Locations, ModelConstants

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
    name = models.CharField(
        max_length=30, 
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering= ["name"]
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

class LocationCategory(models.Model):
    name = models.CharField(
        max_length=40, 
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering= ["name"]
        verbose_name = "Location Category"
        verbose_name_plural = "Location Categories"

# Ex. Electronic, Paper, Alter
class CcfCategory(models.Model):
    name = models.CharField(
        max_length=16, 
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering= ["name"]
        verbose_name = "CCF Category"
        verbose_name_plural = "CCF Categories"

# Ex. EScreen, Mobile Health
class AuthMethod(models.Model):
    name = models.CharField(
        max_length=16, 
        unique=True
    )

    def __str__(self):
        return self.name
    
    class Meta:
        ordering= ["name"]
        verbose_name = "Authorization Method"
        verbose_name_plural = "Authorization Methods"

# Meta list of all medical services we are interested in
class Service(models.Model):
    service_category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True)

    name = models.CharField(
        max_length=50,
        unique=True)

    simple_name = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name="Simple Name"
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]

class Location(models.Model):
    location_category = models.ForeignKey(
        LocationCategory,
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True
    )

    name = models.CharField(max_length=ModelConstants.LOCATION_NAME)
    branch_name = models.CharField(
        max_length=ModelConstants.LOCATION_BRANCH_NAME, 
        blank=True, 
        null=True
    )

    street_line_1 = models.CharField(
        max_length=ModelConstants.LOCATION_STREET_LINE_1
    )
    street_line_2 = models.CharField(
        max_length=ModelConstants.LOCATION_STREET_LINE_2, 
        blank=True, 
        null=True
    )
    city = models.CharField(max_length=ModelConstants.LOCATION_CITY)
    state = models.CharField(
        max_length=2,  # remove this?
        choices=Locations.US_STATES, 
        default=""
    )
    zipcode = models.CharField(max_length=ModelConstants.LOCATION_ZIPCODE)

    # 25 characters allows for an extension substring "ext. #####"
    phone = models.CharField(
        max_length=ModelConstants.LOCATION_PHONE, 
        default=''
    )
    is_phone_callable = models.BooleanField(
        verbose_name="Is this number callable?",
        default=True,
        blank=True
    )
    fax = models.CharField(
        max_length=ModelConstants.LOCATION_FAX, 
        default='',
        blank=True,
        null=True
    )
    website = models.TextField(
        blank=True, 
        null=True
    )

    comments = models.TextField(blank=True, null=True)
    last_updated = models.DateField(
        'Last Updated',
        auto_now=True
    )
    # Will be activated by press of "Verify" button
    last_verified = models.DateField(
        "Last Verified",
        blank=True,
        null=True
    )

    service_list = models.ManyToManyField(
        Service,
        verbose_name="Services Offered"
    )
    ccf_category_list = models.ManyToManyField(
        CcfCategory,
        verbose_name="Chain of Custody Forms Accepted"
    )
    auth_method_list = models.ManyToManyField(
        AuthMethod,
        verbose_name="Authorization Methods Accepted"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'branch_name'],
                name='location_name_branch_name_key'
            )
        ]
    
    def __str__(self):
        if self.branch_name == "":
            return self.name
        else:
            return f"{self.name} - {self.branch_name}"
    

class ServiceTimeRange(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=30)
    start_hour = models.CharField(
        max_length=2,
        choices=DayTime.HOURS,
        verbose_name="Starting Hour",
        default=""
    )
    start_min = models.CharField(
        max_length=2,
        choices=DayTime.MINUTES,
        verbose_name="Starting Minute",
        default=""
    )
    start_am_pm = models.CharField(
        max_length=2,
        choices=DayTime.AM_PM,
        verbose_name="AM/PM",
        default=""
    )

    end_hour = models.CharField(
        max_length=2,
        choices=DayTime.HOURS,
        verbose_name="Starting Hour",
        default=""
    )
    end_min = models.CharField(
        max_length=2,
        choices=DayTime.MINUTES,
        verbose_name="Starting Minute",
        default=""
    )
    end_am_pm = models.CharField(
        max_length=2,
        choices=DayTime.AM_PM,
        verbose_name="AM/PM",
        default=""
    )

    def __str__(self):
        return (
            f'{self.name}: '
            f'{self.start_hour}:{self.start_min} {self.start_am_pm} to '
            f'{self.end_hour}:{self.end_min} {self.end_am_pm}'
        )

    class Meta:
        verbose_name = "Service Time Range"
        verbose_name_plural = "Service Time Ranges"

class DayTimeRange(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    day = models.CharField(
        max_length=len(DayTime.WEDNESDAY),
        choices=DayTime.DAYS,
        default=DayTime.MONDAY
    )

    start_hour = models.CharField(
        max_length=2,
        choices=DayTime.HOURS,
        verbose_name="Starting Hour",
        default=""
    )
    start_min = models.CharField(
        max_length=2,
        choices=DayTime.MINUTES,
        verbose_name="Starting Minute",
        default=""
    )
    start_am_pm = models.CharField(
        max_length=2,
        choices=DayTime.AM_PM,
        verbose_name="Starting AM/PM",
        default=""
    )

    end_hour = models.CharField(
        max_length=2,
        choices=DayTime.HOURS,
        verbose_name="Ending Hour",
        default=""
    )
    end_min = models.CharField(
        max_length=2,
        choices=DayTime.MINUTES,
        verbose_name="Ending Minute",
        default=""
    )
    end_am_pm = models.CharField(
        max_length=2,
        choices=DayTime.AM_PM,
        verbose_name="Ending AM/PM",
        default=""
    )

    def __str__(self):
        return (
            f'{self.day}: '
            f'{self.start_hour}:{self.start_min} {self.start_am_pm} to '
            f'{self.end_hour}:{self.end_min} {self.end_am_pm}'
        )
    
    class Meta:
        verbose_name = "Day/Time Range"
        verbose_name_plural = "Day/Time Ranges"

class Rating(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    up_votes = models.IntegerField(default=0)
    down_votes = models.IntegerField(default=0)
    comments = models.CharField(
        max_length=255, 
        default="", 
        blank=True
    )
    date_submitted = models.DateField(
        'Date Submitted',
        default="1900-01-01"
    )

class Contacts(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=255)
    title = models.CharField(
        max_length=30,
        blank=True, 
        null=True)
    email = models.EmailField(
        max_length=254, 
        blank=True, 
        null=True)
    phone = models.CharField(
        max_length=25, 
        blank=True, 
        null=True) 

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"   


