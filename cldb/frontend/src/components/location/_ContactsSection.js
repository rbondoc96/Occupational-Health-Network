import React, {useContext} from "react"

import {LocationContext} from "../../context/LocationContext"

import ContactCard from "./ContactCard"

export default function ContactsSection({

}) {
    const [info, setInfo] = useContext(LocationContext)
    
    return(
        <>
        {
            info.contacts.length > 0 && <section className="contacts-section">
                <h2>Contacts</h2>
                <div className="contactCards">
                    {info.contacts && info.contacts.map((contact, idx) => {
                        return <ContactCard name={contact.name} title={contact.title} phone={contact.phone} email={contact.email} 
                        key={idx}/>
                    })}
                </div>
            </section>
        }
        </>
    )
}