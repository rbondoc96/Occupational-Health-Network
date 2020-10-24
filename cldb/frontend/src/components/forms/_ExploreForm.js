import React, {useEffect, useState, useRef} from "react"

import GooglePlacesAutocomplete from "react-google-places-autocomplete"

import Button from "../inputs/Button"
import TextInput from "../inputs/TextInput"
import SelectInput from "../inputs/SelectInput"
import CheckboxInput from "../inputs/CheckboxInput"
import ListSelectInput from "../inputs/ListSelectInput"

import LocationCard from "../location/LocationCard"

import "../../styles/forms.scss"

export default function ExploreForm({

}) {

    const [data, setData] = useState({
        location: null,
        radius: null,
    })

    const [results, setResults] = useState([])

    const handleChange = event => {
        let input = event.currentTarget
        let name = input.getAttribute("name")
        let value = input.value

        setData({
            ...data,
            [name]: value
        })

        console.log(data)
    }

    const handleSubmit = event => {
        event.preventDefault()

        var params = new URLSearchParams({
            location: data.location,
            radius: data.radius,
        })

        fetch(
            event.currentTarget.getAttribute("action") + "?" + params
        )
        .then(res => res.json())
        .then(json => {
            setResults(json)
            console.log(json)
        })
    }

    return (
        <>
            <section className="explore-form-container">
                <form
                method="GET"
                action="/api/search/"
                onSubmit={handleSubmit}
                className="form">
                    <h3 className="form-header">Explore the Network</h3>

                    <div className="form-row-2">
                        <div className="explore-form-box">
                            <TextInput 
                                required
                                label="Location" 
                                name="location"
                                placeholder="Enter an address or zipcode"
                                handleChange={handleChange}
                            />
                            <div className="explore-form-radius">
                                <TextInput
                                    required
                                    maxLength={3}
                                    label="Radius"
                                    name="radius"
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row-1">
                        <Button type="submit" children={"Search"} />
                    </div>
                </form>
            </section>
            <div className="explore-results">
                {
                    results.length > 0 && results.map((result, idx) => {
                        return <LocationCard 
                            location={result} 
                            key={idx} 
                            from={"explore"}
                            />
                    })
                }
            </div>
        </>
    )
}