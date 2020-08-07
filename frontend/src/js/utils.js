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

export {timestrConvert}