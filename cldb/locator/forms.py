from django import forms

from .models import (
    Location, 
    Service, 
    LocationCategory,
    CcfCategory,
    AuthMethod
)
from .vars import DayTime, ModelConstants, Locations

# pylint: disable=no-member
class LocationForm(forms.Form):
    location_category = forms.ModelChoiceField(
        queryset=LocationCategory.objects.all(),
        label="Clinic Type"
    )
    location_name = forms.CharField(
        max_length=ModelConstants.LOCATION_NAME,
        label="Clinic Name",
    )
    location_branch_name = forms.CharField(
        max_length=ModelConstants.LOCATION_BRANCH_NAME, 
        required=False,
        label="Branch Name"    
    )
    street_line_1 = forms.CharField(
        max_length=ModelConstants.LOCATION_STREET_LINE_1,
        label="Street Line 1"
    )
    street_line_2 = forms.CharField(
        max_length=ModelConstants.LOCATION_STREET_LINE_2,
        required=False,
        label="Street Line 2"
    )
    city = forms.CharField(
        max_length=ModelConstants.LOCATION_CITY,
        label="City"
    )
    state = forms.ChoiceField(choices=Locations.US_STATES)
    zipcode = forms.CharField(
        max_length=ModelConstants.LOCATION_ZIPCODE,
        label="Zip"
    )
    phone = forms.CharField(
        max_length=ModelConstants.LOCATION_PHONE,
        label="Phone"
    )
    is_phone_callable = forms.BooleanField(
        required=False,
        label="Is this phone number callable?"
    )
    fax = forms.CharField(
        max_length=ModelConstants.LOCATION_FAX,
        required=False,
        label="Fax"
    )
    website = forms.CharField(
        widget=forms.Textarea(
            attrs={
                "rows": 1,
                "style": "resize: none;"
            }
        ),
        required=False,
        label="Website URL"
    )
    comments = forms.CharField(
        widget=forms.Textarea(
            attrs={
                "rows": 5,
                "style": "resize: none;",
                "placeholder": "Specific days for services, who physicals are performed by, anything noteworthy"
            }
        ),
        required=False,
        label="Comments"
    )

    service_list = forms.ModelMultipleChoiceField(
        widget=forms.SelectMultiple(
            attrs={
                "class": "multi-select",
                "data-size": 4,
                "data-dropup-auto": "false"
            }
        ),
        queryset=Service.objects.all(),
        label="Services Offered"
    )
    ccf_category_list = forms.ModelMultipleChoiceField(
        widget=forms.SelectMultiple(
            attrs={
                "class": "multi-select",
                "data-size": 4,
                "data-dropup-auto": "false"
            }
        ),
        queryset=CcfCategory.objects.all(),
        label="COC Forms Accepted"
    )
    auth_method_list = forms.ModelMultipleChoiceField(
        widget=forms.SelectMultiple(
            attrs={
                "class": "multi-select",
                "data-size": 4,
                "data-dropup-auto": "false"                
            }
        ),
        queryset=AuthMethod.objects.all(),
        label="Authorization Methods"
    )
    
    last_verified = forms.CharField(
        max_length=255,
        widget=forms.TextInput(
            attrs={
                "type": "hidden"
            }
        )
    )

    # Modal 1: Contacts
    contact_name = forms.CharField(
        max_length=255,
        required=False,
        label="Contact Name"
    )
    contact_title = forms.CharField(
        max_length=30,
        required=False,
        label="Contact Title"
    )
    contact_email = forms.CharField(
        max_length=254,
        required=False,
        label="Contact Email",
        widget=forms.TextInput()
    )
    contact_phone = forms.CharField(
        max_length=25,
        required=False,
        label="Contact Phone"
    )

    # Modal 2: Hours of Operation
    op_is_range = forms.BooleanField(
        required=False,
        label="Entering a Date Range?"
    )

    op_day1 = forms.ChoiceField(
        choices=DayTime.DAYS,
        label="Day",
        required=False
    )
    op_day2 = forms.ChoiceField(
        initial=False,
        choices=DayTime.DAYS,
        label=" ",
        required=False,
    )
    op_start_time = forms.TimeField(
        input_formats=["%I:%M %p",],
        label="Start Time",
        required=False
    )
    op_end_time = forms.TimeField(
        input_formats=["%I:%M %p",],
        label="End Time",
        required=False
    )

    # Modal 3: Service Hours
    service_name = forms.ModelChoiceField(
        queryset=Service.objects.values_list("simple_name", flat=True)\
            .order_by("simple_name").distinct("simple_name"),
        label="Service",
        required=False
    )
    service_start_time = forms.TimeField(
        input_formats=["%I:%M %p",],
        label="Start Time",
        required=False
    )
    service_end_time = forms.TimeField(
        input_formats=["%I:%M %p",],
        label="End Time",
        required=False
    )