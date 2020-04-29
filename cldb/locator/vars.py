#!/usr/bin/env python

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
    MONDAY = "Mon"
    TUESDAY = "Tue"
    WEDNESDAY = "Wed"
    THURSDAY = "Thu"
    FRIDAY = "Fri"
    SATURDAY = "Sat"
    SUNDAY = "Sun"
    
    DAYS = (
        ("", ""),
        (0, SUNDAY),
        (1, MONDAY),
        (2, TUESDAY),
        (3, WEDNESDAY),
        (4, THURSDAY),
        (5, FRIDAY),
        (6, SATURDAY),
    )

    HOURS = (
        ("",""),("1","1"),("2","2"),("3","3"),("4","4"),
        ("5","5"),("6","6"),("7","7"),("8","8"),("9","9"),
        ("10","10"),("11","11"),("12","12")
    )
    MINUTES = (
        ("",""),("0","00"),("1","01"),("2","02"),("3","03"),
        ("4","04"),("5","05"),("6","06"),("7","07"),("0","08"),
        ("9","09"),("10","10"),("11","11"),("12","12"),("13","13"),
        ("14","14"),("15","15"),("16","16"),("17","17"),("18","18"),
        ("19","19"),("20","20"),("21","21"),("22","22"),("23","23"),
        ("24","24"),("25","25"),("26","26"),("27","27"),("28","28"),
        ("29","29"),("30","30"),("31","31"),("32","32"),("33","33"),
        ("34","34"),("35","35"),("36","36"),("37","37"),("38","38"),
        ("39","39"),("40","40"),("41","41"),("42","42"),("43","43"),
        ("44","44"),("45","45"),("46","46"),("47","47"),("48","48"),
        ("49","49"),("50","50"),("51","51"),("52","52"),("53","53"),
        ("54","54"),("55","55"),("56","56"),("57","57"),("58","58"),
        ("59","59")
    )
    AM_PM = (("",""),("AM","AM"),("PM","PM"))

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

