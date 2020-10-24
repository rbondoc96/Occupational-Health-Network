import React, {useEffect} from "react"

export default function ServiceHourCard({
    service,
    startTime,
    endTime,
    days,
}) {

    return(
        <div className="serviceHoursCard">
            <div className="serviceHoursCard-header">
                <span className="location-label">{service}</span>
            </div>
            <div>
                <span className="location-label">Start Time: </span>{startTime}
            </div>
            <div>
                <span className="location-label">End Time: </span>{endTime}
            </div>
            {days.length > 0 && <div><span className="location-label">Offered On: </span>{days.map(day => {
                return day["name"].substr(0, 3)
            }).join(", ")}</div>}
        </div>
    )
}