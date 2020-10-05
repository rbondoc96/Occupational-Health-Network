import React, {useEffect} from "react"

export default function ContactCard({
    name,
    title,
    phone,
    email,
}) {

    useEffect(() => {
        console.log(name)
    }, [])

    return(
        <div className="service-hour-card">
            {name && <h3>{name}</h3>}
            {title && <div>Title: {title}</div>}
            {phone && <div>Phone: {phone}</div>}
            {email && <div>Email: {email}</div>}
        </div>
    )
}