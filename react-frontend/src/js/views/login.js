import React, {useContext} from "react"
import {Link, Redirect} from "react-router-dom"

import {UserContext} from "../context/user-context"

import LoginForm from "../components/forms/_login-form"

import "../../scss/views/login.scss"

export default function Login() {
    const [auth, setAuth] = useContext(UserContext)

    if(auth.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="container login">
            <LoginForm />
        </div>
    )
}