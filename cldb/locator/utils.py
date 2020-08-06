from django.http import Http404

import googlemaps
from uszipcode import SearchEngine

# pylint: disable=no-member

def get_ratings_by_location(location):
    query = location.review_set.all()
    num_likes = len(query.filter(like=True))
    num_dislikes = len(query.filter(dislike=True))
    num_reviews = len(query)

    return {
        "likes": num_likes, 
        "dislikes": num_dislikes, 
        "reviews": num_reviews
    }

def convert_to_time12(time24):
    # Expects HH:MM:SS, need to validate later
    # Returns %I:%M: %p

    tokens = str(time24).split(":")
    hour = int(tokens[0])
    meridiem = "AM"
    if hour > 12:
        hour = hour - 12
        meridiem = "PM"
    elif hour == 12:
        meridiem = "PM"
    elif hour == 0:
        hour = "12"
    
    return f"{hour}:" + tokens[1] + f" {meridiem}"

def get_nearest_zipcodes(center, radius=5, returns=15):
    """Return a list:string of zipcodes

    Args:
        center (int): Center zipcode
        radius (int, optional): Radius to search
        returns (int, optional): Max number of results

    Returns:
        zips (list:string): List of zipcodes or [] if the zipcode is invalid
    """
    search = SearchEngine()
    info = search.by_zipcode(center)

    if(info.zipcode is not None):
        lat = info.lat
        lng = info.lng

        query = search.by_coordinates(lat, lng, radius=radius, returns=returns)
        zips = [obj.zipcode for obj in query if obj.zipcode is not None]

        return zips

    # Not in the library, so zipcode must be invalid
    else:
        return []

def get_closest_by_address(address, radius=5, returns=15):
    base = "C:/Users/UserOne/Documents/Projects/Clinic Locator & Database/cldb/"
    file_path = base + "/.env/gmaps_api.txt"
    zips = []

    with open(file_path, "r") as file:
        api_key = file.readline()
        gmaps = googlemaps.Client(key=api_key)
        geocode_result = gmaps.geocode(address)

        lat = geocode_result[0]["geometry"]["location"]["lat"]
        lng = geocode_result[0]["geometry"]["location"]["lng"]

        search = SearchEngine()
        query = search.by_coordinates(lat, lng, radius=radius, returns=returns)
        zips = [obj.zipcode for obj in query]

    return zips

def get_ratings(location):
    return {
        "likes": 0,
        "dislikes": 0
    }
