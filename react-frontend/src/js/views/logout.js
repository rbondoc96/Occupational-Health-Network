import React, {useEffect, useContext} from "react"
import {Redirect} from "react-router-dom"

import {UserContext} from "../context/user-context"

export default function Logout() {
    const [auth, setAuth] = useContext(UserContext)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/auth/logout/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${auth.token}`,
            },
        })
        .then(res => {
            setAuth({
                token: localStorage.setItem("token", ""),
                isAuthenticated: false,
                user: null,
            })
        })
    }, [])

    return(
        <div className="logout">
            Logged out
        </div>
    )
}