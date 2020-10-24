import React, {useContext} from "react"

import {LocationContext} from "../context/LocationContext"

import LocationForm from "../components/forms/_LocationForm"

export default function UpdateLocation({

}) {

    const [info, setInfo] = useContext(LocationContext)

    return(
        <>
            <div className="container">
                {
                    !info.id && "Oh no ID"
                }
                {
                    !window.location.href.includes(info.slug) && "Wrong one"
                }
                {
                    info.id && window.location.href.includes(info.slug) 
                    && <LocationForm 
                        initialValues={info}
                    />
                }
            </div>
        </>
    )
}

/* 
    Cases

    1: the LocationContext is empty
        If there is no Location.id, then there is no location

    2: the LocationContext does NOT match what was clicked/OG location

    if !window.location.href.includes(info.slug)
        The address should contain the slug of the Location

    3: the LocationContext DOES match what was clicked
        Here, the above Boolean expression evaluates to false, that is
        The address does contain the slug of the Location

        So then we can render the form
*/