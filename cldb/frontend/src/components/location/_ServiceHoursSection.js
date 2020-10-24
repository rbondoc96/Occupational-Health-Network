import React, {useContext, useEffect} from "react"

import {LocationContext} from "../../context/LocationContext"

import ServiceHourCard from "./ServiceHourCard"

export default function ServiceHoursSection({
    serviceHours,
}) {
    const [info, setInfo] = useContext(LocationContext)

    return(
        <>
        {
            info.serviceHours.length > 0 && <section className="service-hours-section">
                <h2>Service Hours</h2>
                <div className="serviceHoursCards">
                    {info.serviceHours.map((sh, idx) => {
                            return <ServiceHourCard service={sh.name.name} startTime={sh.startTime} endTime={sh.endTime} days={sh.days} 
                                key={idx}
                            />
                        })
                    }
                </div>
            </section>
        }
        </>

    )
}