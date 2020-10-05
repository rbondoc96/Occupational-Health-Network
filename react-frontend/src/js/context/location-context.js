import React, {useState, createContext} from "react"

export const LocationContext = createContext()

export const LocationProvider = ({children}) => {
    const [info, setInfo] = useState({})

    return(
        <LocationContext.Provider value={[info, setInfo]}>
            {children}
        </LocationContext.Provider>
    )
}