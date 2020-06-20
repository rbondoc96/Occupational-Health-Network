#!/usr/bin/env python
from django.utils.translation import ugettext as _

class Locations:
    US_STATES = (
        ("", ""),
        ("AL", "AL"),("AK", "AK"),("AR", "AR"),("AZ", "AZ"),("CA", "CA"),
        ("CO", "CO"),("CT", "CT"),("DC", "DC"),("DE", "DE"),("FL", "FL"),
        ("GA", "GA"),("HI", "HI"),("IA", "IA"),("ID", "ID"),("IL", "IL"),
        ("IN", "IN"),("KS", "KS"),("KY", "KY"),("LA", "LA"),("MA", "MA"),
        ("MD", "MD"),("ME", "ME"),("MI", "MI"),("MN", "MN"),("MO", "MO"),
        ("MS", "MS"),("MT", "MT"),("NC", "NC"),("NE", "NE"),("NH", "NH"),
        ("NJ", "NJ"),("NM", "NM"),("NV", "NV"),("NY", "NY"),("ND", "ND"),
        ("OH", "OH"),("OK", "OK"),("OR", "OR"),("PA", "PA"),("RI", "RI"),
        ("SC", "SC"),("SD", "SD"),("TN", "TN"),("TX", "TX"),("UT", "UT"),
        ("VT", "VT"),("VA", "VA"),("WA", "WA"),("WI", "WI"),("WV", "WV"),
        ("WY", "WY")
    )

class DayTime:
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"

    DAYS = (
        ("", ""),
        (1, _(MONDAY)),
        (2, _(TUESDAY)),
        (3, _(WEDNESDAY)),
        (4, _(THURSDAY)),
        (5, _(FRIDAY)),
        (6, _(SATURDAY)),
        (7, _(SUNDAY))
    )

class ModelConstants:
    LOCATION_NAME = 70
    LOCATION_BRANCH_NAME = 30
    LOCATION_STREET_LINE_1 = 50
    LOCATION_STREET_LINE_2 = 35 
    LOCATION_CITY = 45 
    LOCATION_STATE = 2
    LOCATION_ZIPCODE = 10
    LOCATION_PHONE = 25 
    LOCATION_FAX = 14

