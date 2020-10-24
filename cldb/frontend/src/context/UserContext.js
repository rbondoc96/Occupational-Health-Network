import React, {useState, createContext} from "react"

export const UserContext = createContext()

export const UserProvider = ({
    children
}) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        isLoading: false,
        user: null,
    })

    return (
        <UserContext.Provider value={[auth, setAuth]}>
            {children}
        </UserContext.Provider>
    )
}

