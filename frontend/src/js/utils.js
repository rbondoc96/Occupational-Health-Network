const timestrConvert = function(timeStr) {
    var tokens = timeStr.split(":")

    let hour = parseInt(tokens[0])
    let meridian = "AM"
    if(hour >= 12) {
        meridian = "PM"
        if(hour > 12) 
            hour -= 12
    } else if(hour == 0) {
        hour = 12
    }

    return `${hour}:${tokens[1]} ${meridian}`
}

const getCookie = function(name) {
    var cookieValue

    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';')

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                )
                break
            }
        }
    }
    return cookieValue
}

const timeRangeToString = function(time1, time2) {
    if(time1 == "11:59 PM" && time2 == "11:59 PM") 
        return "Closed"
    else if(time1 == "12:00 AM" && time2 == "12:00 AM")
        return "Open 24 Hours"
    else 
        return `${time1} to ${time2}`
}

const lookup = function(endpoint, callback, options) {
    let apiUrl = "http://127.0.0.1:8000/api/" + endpoint + "/"
    fetch(apiUrl, options)
    .then(response => response.json())
    .then(json => callback(json))
}

export {timestrConvert, getCookie, timeRangeToString, lookup}