import React, {useContext} from "react"
import {Link, Redirect} from "react-router-dom"

import {UserContext} from "../context/UserContext"

import LoginForm from "../components/forms/_LoginForm"

export default function Login() {
    const [auth, setAuth] = useContext(UserContext)

    if(auth.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
            <LoginForm />
        </div>
    )
}