import React, {useContext} from "react"
import {Redirect} from "react-router-dom"

import {UserContext} from "../context/UserContext"

import RegisterForm from "../components/forms/_RegisterForm"
 
export default function Login() {
    const [auth, setAuth] = useContext(UserContext)

    if(auth.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="container register">
            <RegisterForm />           
        </div>
    )
}