import React, {useState, useEffect, useContext} from "react"
import cookie from "react-cookies"

import {UserContext} from "../../context/user-context"
import {LocationFormContext} from "../../context/LocationFormContext"

import Button from "./button"
import TextInput from "./inputs/TextInput"
import SelectInput from "./inputs/SelectInput"
import CheckboxInput from "./inputs/CheckboxInput"
import ListSelectInput from "./inputs/ListSelectInput"

import BusinessHoursSubform from "./subforms/BusinessHoursSubform"
import ServiceHoursSubform from "./subforms/ServiceHoursSubform"
import ContactsSubform from "./subforms/ContactsSubform"

import "../../../scss/components/forms/forms.scss"

const STATES = {
    "AK": "Alaska",
    "AL": "Alabama",
    "AR": "Arkansas",
    "AZ": "Arizona",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DC": "District Of Columbia",    
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "IA": "Iowa",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "MA": "Massachusetts",
    "MD": "Maryland",
    "ME": "Maine",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MO": "Missouri",
    "MS": "Mississippi",
    "MT": "Montana",
    "NC": "North Carolina",
    "ND": "North Dakota",    
    "NE": "Nebraska",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NV": "Nevada",
    "NY": "New York",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico", 
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VA": "Virginia",
    "VI": "Virgin Islands",
    "VT": "Vermont",
    "WA": "Washington",
    "WI": "Wisconsin",
    "WV": "West Virginia",
    "WY": "Wyoming"
}

export default function LocationForm({
    
}) {
    const [auth, setAuth] = useContext(UserContext)
    const {
        mainContext, 
        businessHoursContext,
        serviceHoursContext,
        contactsContext
    } = useContext(LocationFormContext)

    const [mainForm, setMainForm] = mainContext
    const [businessHours, setBusinessHours] = businessHoursContext
    const [serviceHours, setServiceHours] = serviceHoursContext
    const [contacts, setContacts] = contactsContext

    const [services, setServices] = useState()
    const [categories, setCategories] = useState()
    const [authMethods, setAuthMethods] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        let formNode = event.target
        
        let csrfcookie = cookie.load("csrftoken")
        let input = `<input type="hidden" name="csrfmiddlewaretoken" value="${csrfcookie}">`
        formNode.insertAdjacentHTML("beforeend", input)

        let data = {
            ...mainForm,
            op_hours_list: businessHours,
            service_hours_list: serviceHours,
            contacts_list: contacts
        }
        
        fetch(formNode.getAttribute("action"), {
            method: "POST",
            headers: {
                "Authorization": `Token ${auth.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    const handleChange = event => {
        let input = event.currentTarget
        let name = input.getAttribute("name")
        let value = input.value
        let isChecked = null

        if(input.getAttribute("type") == "checkbox") {
            isChecked = input.checked
        }

        if(name.includes("list")) {
            let list = mainForm[name]

            // Inputs are a list of checkboxes
            if(list) {    
                if(!list.includes(value) && isChecked) {
                    list.push(value)
                } else if(list.includes(value) && !isChecked) { 
                    // Value is already in the list and
                    // input is unchecked
                    let index = list.indexOf(value)
                    if(index >= 0) 
                        list.splice(index, 1);
                } else if(!list.includes(value) && !isChecked) {

                }
            }
            else
                list = [value]

            value = list
        } else {
            if(name == "is_phone_callable")
                value = !isChecked
        }

        setMainForm({
            ...mainForm,
            [name]: value
        })
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/location_categories/")
        .then(res => res.json())
        .then(json => {
            setCategories(json)
        })

        fetch("http://127.0.0.1:8000/api/services/")
        .then(res => res.json())
        .then(json => {
            setServices(json)
        })

        fetch("http://127.0.0.1:8000/api/auth_methods")
        .then(res => res.json())
        .then(json => {
            setAuthMethods(json)
        })
    }, [])

    return (
        <section className="form-container">
            <form
            method="POST"
            action="http://127.0.0.1:8000/api/locations/"
            onSubmit={handleSubmit}
            className="form">
                <h3 className="form-header">Add New Location</h3>

                {/* Location Category */}
                <div className="form-row-1">
                    <SelectInput 
                        required
                        label="Clinic Category"
                        name="location_category"
                        optionObjs={categories}
                        placeholder="Choose a Category..."
                        handleChange={handleChange}
                    />
                </div>

                {/* Location Name */}
                <div className="form-row-2">
                    <TextInput 
                    required
                    label="Clinic Name"
                    name="name"
                    placeholder="Clinic Name"
                    handleChange={handleChange}                    
                    />

                    <TextInput 
                    label="Branch Name"
                    name="branch_name"
                    placeholder="Branch Name"
                    handleChange={handleChange}                    
                    />
                </div>

                {/* Location Address */}
                <div className="form-row-2">
                    <TextInput 
                    required
                    label="Address Line 1"
                    name="street_line_1"
                    placeholder="Address Line 1"
                    handleChange={handleChange}
                    />

                    <TextInput 
                    label="Address Line 2"
                    name="street_line_2"
                    placeholder="Address Line 2"
                    handleChange={handleChange}
                    />
                </div>

                {/* Location City, State, Zipcode */}
                <div className="form-row-3">
                    <TextInput 
                        required
                        label="City"
                        name="city"
                        placeholder="City"
                        handleChange={handleChange}
                        />
                    <SelectInput 
                        required
                        label="State"
                        name="state"
                        options={Object.keys(STATES)}
                        placeholder="State"
                        handleChange={handleChange}
                        />
                    <TextInput 
                        required
                        maxLength={5}
                        label="Zipcode"
                        name="zipcode"
                        placeholder="Zipcode"
                        handleChange={handleChange}
                        />
                </div>              
            
                {/* Location Phone / Fax */}
                <div className="form-row-2">
                    <TextInput 
                    required
                    type="phone"
                    label="Phone #"
                    name="phone"
                    message="Ex: (123) 456-7890 ext. 12345"
                    placeholder="(123) 456-7890"
                    handleChange={handleChange}
                    />

                    <TextInput 
                    type="phone"
                    label="Fax #"
                    name="fax"
                    placeholder="(123) 456-7890"
                    handleChange={handleChange}                    
                    />
                </div>

                {/* Location Is Phone Callable */}
                <div className="form-row-1">
                    <CheckboxInput 
                        label="Is the phone number an automated phone line?"
                        value={false}
                        name="is_phone_callable"
                        handleChange={handleChange}
                    />
                </div>

                {/* Location Website */}
                <div className="form-row-1">
                    <TextInput 
                        type="url"
                        label="Website"
                        name="website"
                        placeholder="https://google.com"
                        handleChange={handleChange}
                        />
                </div>                

                {/* Location Services Offered */}
                <div className="form-row-1">
                    <ListSelectInput 
                        required
                        optionObjs={services}
                        label="Services Offered"
                        name="service_list"
                        handleChange={handleChange}
                        />
                </div>    

                {/* Location Payment Methods */}
                <div className="form-row-1">
                    <ListSelectInput 
                        optionObjs={authMethods}
                        label="Authorize Services Using"
                        name="auth_method_list"
                        handleChange={handleChange}
                        />
                </div>

                {/* Location Business Hours */}
                <div className="form-row-1">
                    <BusinessHoursSubform />
                </div>

                {/* Location Service Hours */}
                <div className="form-row-1">
                    <ServiceHoursSubform services={services}/>
                </div>        

                {/* Location Contacts */}
                <div className="form-row-1">
                    <ContactsSubform />
                </div>        

                {/* Location Submit Button */}
                <div className="form-row-1">
                    <Button 
                        type="submit"
                        children="Add Location"
                    />
                </div>        
            </form>
        </section>
    )
}