import React from "react"
import {Link} from "react-router-dom"

export default function LocationCard({
    location,
    from,
}) {

    return(
        <>
            <div className="locationCard">
                <Link 
                to={`/location/${location["slug"]}/`} 

                state={{
                    from: from
                }}

                children={`${location["name"]}${
                    location["branch_name"]? 
                    ` - ${location["branch_name"]}`
                    : ""}`} />
            </div>
        </>
    )
}