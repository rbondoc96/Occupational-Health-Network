import React, {useState, createContext} from "react"

export const LocationFormContext = createContext()

export const LocationFormProvider = ({
    children
}) => {
    const [mainForm, setMainForm] = useState({
        is_phone_callable: true,
        service_list: [],
        auth_method_list: []
    })
    const [businessHours, setBusinessHours] = useState([])
    const [serviceHours, setServiceHours] = useState([])
    const [contacts, setContacts] = useState([])

    return(
        <LocationFormContext.Provider value={{
            mainContext: [mainForm, setMainForm],
            businessHoursContext: [businessHours, setBusinessHours],
            serviceHoursContext: [serviceHours, setServiceHours],
            contactsContext: [contacts, setContacts]
        }}>
            {children}
        </LocationFormContext.Provider>
    )
}