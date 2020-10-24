import React, {useContext} from "react"

import {LocationContext} from "../../context/LocationContext"

import ServiceCard from "./ServiceCard"

export default function ServiceSection({
    
}) {
    const [info, setInfo] = useContext(LocationContext)

    return(
        <>
        {
            info.services.length > 0 && <section className="service-section">
                <h2>Services Offered</h2>
                <div className="serviceCards">
                    {(info.serviceCategories && info.services) && info.serviceCategories.map((category, idx) => {
                            return <ServiceCard category={category} key={idx}
                            services={
                                info.services.filter(service => {
                                    return service["service_category"] == category
                                }).map(service => service["name"])
                            } />
                        })
                    }
                </div>
            </section>
        }
        </>
    )
}