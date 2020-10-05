import React, {useContext} from "react"

import {LocationContext} from "../../context/location-context"

import ContactCard from "./contact-card"

export default function ContactsSection({

}) {
    const [info, setInfo] = useContext(LocationContext)
    
    return(
        <section className="contacts-section">
            <h2>Contacts</h2>
            <div className="contact-cards">
                {info.contacts && info.contacts.map(contact => {
                    return <ContactCard name={contact.name} title={contact.title} phone={contact.phone} email={contact.email} />
                })}
            </div>
        </section>
    )
}