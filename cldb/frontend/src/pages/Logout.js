import React, {useEffect, useContext} from "react"
import {Redirect} from "react-router-dom"

import {UserContext} from "../context/UserContext"

export default function Logout() {
    const [auth, setAuth] = useContext(UserContext)

    useEffect(() => {
        if(auth.token) {
            fetch("/api/auth/logout/", {
                method: "POST",
                headers: {
                    "Authorization": `Token ${auth.token}`,
                },
            })
            .then(res => {
                setAuth({
                    token: localStorage.setItem("token", null),
                    isAuthenticated: false,
                    user: null,
                })
            })
        }
    }, [])

    return(
        <div className="logout">
            Logged out
        </div>
    )
}