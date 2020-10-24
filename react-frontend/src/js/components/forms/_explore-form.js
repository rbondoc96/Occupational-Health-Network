import React, {useEffect, useState} from "react"

import Button from "./button"
import TextInput from "./inputs/TextInput"
import SelectInput from "./inputs/SelectInput"
import CheckboxInput from "./inputs/CheckboxInput"
import ListSelectInput from "./inputs/ListSelectInput"

import "../../../scss/components/forms/forms.scss"

export default function ExploreForm({

}) {

    return (
        <section className="explore-form-container">
            <form
            method="GET"
            action="http://127.0.0.1:8000/api/search/"
            className="form">
                <h3 className="form-header">Explore the Network</h3>

                <div className="form-row-1">
                    <div className="explore-form-box">
                        <TextInput 
                            required
                            label="Clinic Category"
                            name="location"
                            placeholder="Enter an address or zipcode"
                        />
                        <div className="explore-form-radius">
                            <TextInput
                                required
                                maxLength={3}
                                label="Radius"
                                name="radius"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}