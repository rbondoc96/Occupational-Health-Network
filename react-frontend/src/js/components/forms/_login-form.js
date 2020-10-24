import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"

import {UserContext} from "../../context/user-context"

import "../../fontawesome/library"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import TextInput from "./text-input"
import Button from "./button"

export default function LoginForm() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const [message, setMessage] = useState("")

    const [auth, setAuth] = useContext(UserContext)

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.getAttribute("name")]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        })
        .then(res => res.json())
        .then(json => {
            if(json["token"] == null){
                let key = Object.keys(json)[0]
                setMessage(json[key])
                
                setAuth({
                    ...auth,
                    token: "",
                    user: null,
                    isAuthenticated: false
                })
                throw new Error("Error")
            } else {
                localStorage.setItem("token", json["token"])
                setAuth({
                    ...auth,
                    token: json["token"],
                    user: json["user"],
                    isAuthenticated: true,
                })
            }            
        })
        .catch(err => console.log(err))
    }

    const UserIcon = <FontAwesomeIcon icon="user-circle" className="input-icon" />
    const LockedIcon = <FontAwesomeIcon icon="lock" 
    className="input-icon" />

    return(
        <section className="form-container">
            <h2 className="form-header">Welcome Back</h2>
            <form 
            method="POST" 
            action="http://127.0.0.1:8000/api/auth/login/"
            className="login-form"
            onSubmit={handleSubmit}>
                <TextInput 
                required 
                id={"login-username"} 
                name={"username"} 
                placeholder={"Username"}
                icon={UserIcon}
                message={message}
                handleChange={handleChange}/>

                <TextInput 
                required
                id={"login-password"} 
                name={"password"} 
                type={"password"} 
                handleChange={handleChange}
                placeholder={"Password"}    
                icon={LockedIcon} />

                <Button type="submit" children={"Login"} />
            </form>
            <p>
                Don't have an account? Click <Link to="/register" children={" here"}/> to register
            </p>            
        </section>
    )
}