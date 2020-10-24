import React, {useContext, useEffect} from "react"

import {LocationFormContext} from "../../context/LocationFormContext"

import {_24to12} from "../../utils/time-tools"
 
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

export default function BusinessHoursSubform({
    defaultEntries
}) {

    const {businessHoursContext} = useContext(LocationFormContext)
    const [businessHours, setBusinessHours] = businessHoursContext
    
    const uniqueField = "day"

    const businessHourSubentryWorker = entry => {
        let key = entry["key"]
        let day = entry["day"]
        let startTime = entry["startTime"]
        let endTime = entry["endTime"]
    
        if(!startTime.includes("M") && !startTime.includes("m")) {
            startTime = _24to12(startTime)
        }
        if(!endTime.includes("M") && !endTime.includes("m")) {
            endTime = _24to12(endTime)
        }
  
        return <SubformEntry 
                  line1={`${DAYS.filter(obj => obj.id == day)[0]["name"]}`}
                  line2={`${startTime} to ${endTime}`}       
                  serialID={key}
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
        setBusinessHours(list.filter(entry => {
            let input = subentry.querySelector("input")
            let value = JSON.parse(input.getAttribute("value"))
            
            return entry[uniqueField] != value[uniqueField]
        }))
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