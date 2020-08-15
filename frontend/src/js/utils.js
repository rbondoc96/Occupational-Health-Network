const timestrConvert = function(timeStr) {
    var tokens = timeStr.split(":")

    let hour = parseInt(tokens[0])
    let meridian = "AM"
    if(hour >= 12) {
        meridian = "PM"
        if(hour > 12) 
            hour -= 12
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

export {timestrConvert, getCookie}