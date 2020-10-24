import React, {useEffect} from "react"

export default function ServiceCard({
    category,
    services,
}) {

    return(
        <div className="serviceCard">
            <h3>{category}</h3>
            <ul>
                {services
                ? services.map((service, idx) => {
                    return <li key={idx}>
                        {service}
                    </li>
                })
                :""
                }
            </ul>
        </div>
    )
}