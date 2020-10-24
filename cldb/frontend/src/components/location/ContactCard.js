import React, {useEffect} from "react"

export default function ContactCard({
    name,
    title,
    phone,
    email,
}) {

    return(
        <div className="contactCard">
            <div className="contactCard-header">
                <span className="location-label">{name}</span>
            </div>
            {
                    title && <div>
                        <span className="location-label">Title: </span>{title}
                    </div>
            }  
            {
                phone && <div>
                        <span className="location-label">Phone: </span>{phone}
                    </div>
            } 
            {
                email && <div>
                        <span className="location-label">Email: </span>{email}
                    </div>
            }
        </div>
    )
}