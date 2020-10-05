import React, {useState, createContext} from "react"

export const UIContext = createContext()

export const UIProvider = ({
    children
}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 960)

    return(
        <UIContext.Provider value={[isMobile, setIsMobile]}>
            {children}
        </UIContext.Provider>
    )
}