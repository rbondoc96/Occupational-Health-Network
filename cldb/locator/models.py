#!/usr/bin/env python

import psycopg2

from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse
from django.db import models, IntegrityError

from .vars import Geography, ModelConstants
from .utils import convert_to_time12

class Day(models.Model):
    name = models.CharField(
        max_length=9,
        unique=True,
    )
    abbreviation = models.CharField(
        max_length=3,
        unique=True,
    )

    def __str__(self):
        return self.name

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

class AuthMethod(models.Model):
    name = models.CharField(
        max_length=32, 
        unique=True
    )

    def __str__(self):
        return self.name
    
    class Meta:
        ordering= ["name"]
        verbose_name = "Authorization Method"
        verbose_name_plural = "Authorization Methods"

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
        max_length=20,
        blank=True,
        null=True,
        verbose_name="Simple Name"
    )

    description = models.TextField(blank=True,null=True)
    simple_description = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.service_category} - {self.name}"

    class Meta:
        ordering = ["service_category", "name",]
        constraints = [
            models.UniqueConstraint(
                fields=["service_category", "name"],
                name="service_service_category_name_key"
            )
        ]

class Location(models.Model):
    slug = models.SlugField(
        unique=True,
        blank=True,
        null=True
    )
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
        max_length=2,
        choices=Geography.US_STATES, 
        default=""
    )
    zipcode = models.CharField(max_length=ModelConstants.LOCATION_ZIPCODE)

    phone = models.CharField(
        max_length=ModelConstants.LOCATION_PHONE, 
        default=""
    )
    is_phone_callable = models.BooleanField(
        verbose_name="Is this phone number callable?",
        default=True,
        blank=True
    )
    fax = models.CharField(
        max_length=ModelConstants.LOCATION_FAX, 
        default="",
        blank=True,
        null=True
    )
    website = models.TextField(
        blank=True, 
        null=True
    )

    comments = models.TextField(blank=True, null=True)
    date_created = models.DateField(
        "Date Created",
        auto_now_add=True,
    )
    last_updated = models.DateField(
        "Last Updated",
        auto_now=True,
        blank=True,
        null=True
    )

    service_list = models.ManyToManyField(
        Service,
        verbose_name="Services Offered"
    )
    ccf_category_list = models.ManyToManyField(
        CcfCategory,
        verbose_name="UDS Chain of Custody Forms Accepted",
        blank=True,
    )
    auth_method_list = models.ManyToManyField(
        AuthMethod,
        verbose_name="Authorization Methods Accepted",
        blank=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "branch_name", "street_line_1"],
                name="location_name_branch_name_street_line_1_key"
            )
        ]
    
    def get_absolute_url(self):
        return reverse("location_detail", kwargs={"slug": self.slug})
    
    def __str__(self):
        if self.branch_name == "" or self.branch_name == None:
            return self.name
        return f"{self.name} - {self.branch_name}"
    
class ServiceTimeRange(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=30)
    start_time = models.TimeField(
        default="0:00 AM", 
        verbose_name="Start Time"
    )
    end_time = models.TimeField(
        default="0:00 AM", 
        verbose_name="End Time"
    )

    days = models.ManyToManyField(
        Day,
        verbose_name="Days Offered",
        blank=True,
    )

    def __str__(self):
        start_12 = convert_to_time12(self.start_time)
        end_12 = convert_to_time12(self.end_time)
        return f'{self.name}: {start_12} to {end_12}'

    class Meta:
        ordering=["name"]
        verbose_name = "Service Time Range"
        verbose_name_plural = "Service Time Ranges"

class DayTimeRange(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    day = models.ForeignKey(
        Day,
        on_delete=models.CASCADE,
    )
    start_time = models.TimeField(
        default="0:00 AM", 
        verbose_name="Start Time"
    )
    end_time = models.TimeField(
        default="0:00 AM", 
        verbose_name="End Time"
    )

    def __str__(self):
        return f"{self.day}"
    
    class Meta:
        ordering = ["day"]
        verbose_name = "Day/Time Range"
        verbose_name_plural = "Day/Time Ranges"

        constraints = [
            models.UniqueConstraint(
                fields=["location", "day"],
                name="daytimerange_location_day_key"
            ),
        ]

class ReviewType(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name="Review Type",
    )

    def __str__(self): 
        return self.name
        
    class Meta:
        verbose_name = "Review Type"

class Review(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE
    )

    review_type = models.ForeignKey(
        ReviewType,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    owner = models.ForeignKey(
        User,
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True
    )

    like = models.BooleanField(
        verbose_name="Yes",
        default=False,
    )
    dislike = models.BooleanField(
        verbose_name="No",
        default=False,
    )
    comments = models.TextField(blank=True, null=True)
    date_edited = models.DateField(
        "Last Edited",
        auto_now=True,
    )
    date_submitted = models.DateField(
        'Date Submitted',
        auto_now_add=True
    )

class Contacts(models.Model):
    location = models.ForeignKey(
        Location, 
        on_delete=models.CASCADE,
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

    def __str__(self):
        title_str = f" - {self.title}" if self.title else ""
        return f"{self.name}{title_str}"

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"   


