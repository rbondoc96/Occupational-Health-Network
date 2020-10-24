import React, {useContext} from "react"

import {LocationFormContext} from "../../../context/LocationFormContext"

import Subform, {SubformEntry} from "./Subform"

import ListSelectInput from "../inputs/ListSelectInput"
import SelectInput from "../inputs/SelectInput"
import TextInput from "../inputs/TextInput"

const DAYS = [
    {id: 1, name: "Monday", abbrev: "Mon"},
    {id: 2, name: "Tuesday", abbrev: "Tue"},
    {id: 3, name: "Wednesday", abbrev: "Wed"},
    {id: 4, name: "Thursday", abbrev: "Thu"},
    {id: 5, name: "Friday", abbrev: "Fri"},
    {id: 6, name: "Saturday", abbrev: "Sat"},
    {id: 7, name: "Sunday", abbrev: "Sun"},
]

export default function ServiceHoursSubform({
    services,
    ...rest
}) {

    const {serviceHoursContext} = useContext(LocationFormContext)
    const [serviceHours, setServiceHours] = serviceHoursContext

    const uniqueField = "service"

    const generator = entry => {
        let id = entry["key"]
        let service = entry["service"]
        let startTime = entry["startTime"]
        let endTime = entry["endTime"]
        let days = entry["days"]
        
        // Find objects in DAYS that match the id's in "days"
        let dayStrs = []
        for(let id of days) {
            dayStrs.push(
                DAYS.filter(day => day.id == id).map(elem => elem["abbrev"])[0]
            )
        }
  
        return <SubformEntry 
                  key={id}
                  line1={`${services.filter(obj => obj.id == service)[0]["name"]}`}
                  line2={`${startTime} to ${endTime}`}
                  line3={`Offered: ${dayStrs.join(", ")}`}
                  serialID={id}
                  name="service_hours_list"
                  />
    }   
    
    const detective = input => {
        return DAYS.filter(day => day.id == input.value).map(elem => elem.id)[0]
    }

    const addToContext = subentry => {
        if(subentry[uniqueField] && serviceHours.filter(entry => entry[uniqueField] == subentry[uniqueField]).length == 0) {
            let list = [...serviceHours]
            list.push(subentry)
            setServiceHours(list)  
        }

        console.log("Context", serviceHours)
    }

    const removeFromContext = subentry => {
        let list = [...serviceHours]
        setServiceHours(list.filter(entry => entry["key"] != subentry.getAttribute("data-id")))   
        
        console.log("Subentries", serviceHours)
    }

    return(
        <>
            <Subform 
            title="Service Hours"
            subentryGenerator={generator}
            listselectDetective={detective}
            addToContext={addToContext}
            removeFromContext={removeFromContext}
            subentries={serviceHours}            
            >
            <SelectInput 
                label="Service"
                id="serviceHour-service"
                optionObjs={services}
                width={400}
                />
            <TextInput 
                type="time"
                label="Start Time"
                id="serviceHour-startTime"
                width={400}
                />
            <TextInput 
                type="time"
                label="End Time"
                id="serviceHour-endTime"
                width={400}
                />   
            
            <ListSelectInput
                id="serviceHour-days"
                label="Days Offered"
                optionObjs={DAYS}
                />
            </Subform>
        </>        
    )
}