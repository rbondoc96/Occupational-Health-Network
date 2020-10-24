import React, {useContext} from "react"

import {LocationFormContext} from "../../../context/LocationFormContext"

import Subform, {SubformEntry} from "./Subform"

import TextInput from "../inputs/TextInput"

export default function ContactsSubform({

}) {

    const {contactsContext} = useContext(LocationFormContext)
    const [contacts, setContacts] = contactsContext

    const uniqueField = "name"

    const contactsSubentryWorker = entry => {
        let id = entry["key"]
        let name = entry["name"]
        let title = entry["title"]
        let phone = entry["phone"]
        let email = entry["email"]
  
        return <SubformEntry 
                  line1={`${name}${title? ` - ${title}`:""}`}
                  line2={phone? `Phone: ${phone}`:null}       
                  line3={email? `Email: ${email}`:null}
                  serialID={id}
                  name="contacts_list"
                  />
    }

    const addToContext = subentry => {
        if(subentry[uniqueField] && contacts.filter(entry => entry[uniqueField] == subentry[uniqueField]).length == 0) {
            let list = [...contacts]
            list.push(subentry)
            setContacts(list)  
        }

        console.log("Context", contacts)
    }

    const removeFromContext = subentry => {
        let list = [...contacts]
        setContacts(list.filter(entry => entry["key"] != subentry.getAttribute("data-id")))   
        
        console.log("Subentries", contacts)
    }    
    
    return(
        <>
            <Subform
            title="Contacts"
            subentryGenerator={contactsSubentryWorker}
            addToContext={addToContext}
            removeFromContext={removeFromContext}
            subentries={contacts}              
            >
            <TextInput 
                label="Name of Contact"
                id="contact-name"
                name="businessHour-op_hour_day"
                />
            <TextInput 
                label="Credentials"
                id="contact-title"
                />
            <TextInput 
                type="phone"
                label="Phone"
                id="contact-phone"
                />
            <TextInput 
                type="email"
                label="Email"
                id="contact-email"
                />
            </Subform>
        </>        
    )
}