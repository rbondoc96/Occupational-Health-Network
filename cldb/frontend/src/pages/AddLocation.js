import React, {useEffect} from "react"

import {LocationFormProvider} from "../context/LocationFormContext"

import SubForm from "../components/subforms/Subform"
import LocationForm from "../components/forms/_LocationForm"

export default function AddLocation() {
    return(
        <div className="container">
            <LocationForm 
                header="Add New Location"
            />
        </div>
    )
}