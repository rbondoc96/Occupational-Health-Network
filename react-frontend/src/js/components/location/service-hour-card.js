import React, {useEffect} from "react"

export default function ServiceHourCard({
    service,
    startTime,
    endTime,
    days,
}) {

    return(
        <div className="service-hours-card">
            <h3>{service}</h3>
            <div>Start Time: {startTime}</div>
            <div>End Time: {endTime}</div>
            {days.length > 0 && <div>Offered On: {days.map(day => day.slice(0,3)).join(", ")}</div>}
        </div>
    )
}