import React, {useContext} from "react"

import {LocationFormContext} from "../../../context/LocationFormContext"

import Subform, {SubformEntry} from "./Subform"

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

export default function BusinessHoursSubform() {

    const {businessHoursContext} = useContext(LocationFormContext)
    const [businessHours, setBusinessHours] = businessHoursContext
    
    const uniqueField = "day"

    const businessHourSubentryWorker = entry => {
        let id = entry["key"]
        let day = entry["day"]
        let startTime = entry["startTime"]
        let endTime = entry["endTime"]
  
        return <SubformEntry 
                  line1={`${DAYS.filter(obj => obj.id == day)[0]["name"]}`}
                  line2={`${startTime} to ${endTime}`}       
                  serialID={id}
                  name="op_hours_list"
                  />
    }

    const addToContext = subentry => {
        if(subentry[uniqueField] && businessHours.filter(entry => entry[uniqueField] == subentry[uniqueField]).length == 0) {
            let list = [...businessHours]
            list.push(subentry)
            setBusinessHours(list)  
        }
    }

    const removeFromContext = subentry => {
        let list = [...businessHours]
        setBusinessHours(list.filter(entry => entry["key"] != subentry.getAttribute("data-id")))   
        
        console.log("Subentries", businessHours)
    }


    return(
        <>
            <Subform
               title="Business Hours"
               subentryGenerator={businessHourSubentryWorker}       
               addToContext={addToContext}
               removeFromContext={removeFromContext}
               subentries={businessHours}
               >
               <SelectInput 
                  label="Day"
                  id="businessHour-day"
                  name="businessHour-op_hour_day"
                  optionObjs={DAYS}
                  />
               <TextInput 
                  type="time"
                  label="Start Time"
                  id="businessHour-startTime"
                  name="businessHour-op_hour_start_time"
                  />
               <TextInput 
                  type="time"
                  label="End Time"
                  id="businessHour-endTime"
                  name="businessHour-op_hour_end_time"
                  />
            </Subform>
        </>
    )
}