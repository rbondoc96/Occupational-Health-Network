import React, {useEffect} from "react"

export default function ServiceCard({
    category,
    services,
}) {

    return(
        <div className="service-card">
            <h3>{category}</h3>
            <ul>
                {services
                ? services.map(service => {
                    return <li key={service.id}>
                        {service.name}
                    </li>
                })
                :""
                }
            </ul>
        </div>
    )
}