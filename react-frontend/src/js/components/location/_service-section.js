import React, {useContext} from "react"

import {LocationContext} from "../../context/location-context"

import ServiceCard from "./service-card"

export default function ServiceSection({
    
}) {
    const [info, setInfo] = useContext(LocationContext)

    return(
        <section className="service-section">
            <h2>Services Offered</h2>
            <div className="service-cards">
                {(info.serviceCategories && info.services) && info.serviceCategories.map((category, idx) => {
                        return <ServiceCard category={category} key={idx}
                        services={
                            info.services.filter(service => {
                                return service.category == category
                            })
                        } />
                    })
                }
            </div>
        </section>
    )
}