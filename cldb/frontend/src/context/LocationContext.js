import React, {useState, createContext} from "react"

export const LocationContext = createContext()

export const LocationProvider = ({children}) => {
    const [info, setInfo] = useState({
        id: "",
        slug: "",
        category: "",
        name: "",
        branchName: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
        fax: "",
        isCallable: "",
        website: "",
        comments: "",
        services: null,
        serviceCategories: null,
        serviceHours: null,
        businessHours: null,
        contacts: null,
        paymentMethods: null,
    })

    return(
        <LocationContext.Provider value={[info, setInfo]}>
            {children}
        </LocationContext.Provider>
    )
}