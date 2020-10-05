import React, {useContext, useEffect} from "react"

import {LocationContext} from "../../context/location-context"

import ServiceHourCard from "./service-hour-card"

export default function ServiceHoursSection({
    serviceHours,
}) {
    const [info, setInfo] = useContext(LocationContext)

    useEffect(() => {
        console.log("Info: " + info.serviceHours)
        
        let hi = info.serviceHours.map(sh => {
            console.log(sh.name)
            return sh.name
        })

        console.log(hi)
    })

    return(
        <section className="service-hours-section">
            <h2>Service Hours</h2>
            <div className="service-hours-cards">
                {info.serviceHours && info.serviceHours.map(sh => {
                        return <ServiceHourCard service={sh.name} startTime={sh.startTime} endTime={sh.endTime} days={sh.days} />
                    })
                }
            </div>
        </section>
    )
}