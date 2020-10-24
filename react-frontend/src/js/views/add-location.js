import React, {useEffect} from "react"

import {LocationFormProvider} from "../context/LocationFormContext"

import SubForm from "../components/forms/subforms/Subform"
import LocationForm from "../components/forms/_location-form"

import "../../scss/views/add-location.scss"

export default function AddLocation() {

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/services/")
    //     .then(res => res.json())
    //     .then(json => console.log(json))
    // }, [])

    return(
        <div className="container add-location">
            <LocationFormProvider>
                <LocationForm />
            </LocationFormProvider>
        </div>
    )
}