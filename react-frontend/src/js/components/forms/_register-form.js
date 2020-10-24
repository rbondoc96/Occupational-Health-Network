import React, {useState, useContext} from "react"
import {Link} from "react-router-dom"

import "../../fontawesome/library"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {UserContext} from "../../context/user-context"

import TextInput from "./text-input"
import Button from "./button"

import "../../../scss/forms.scss"

export default function RegisterForm() {
    const initialState = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
    }

    const [form, setForm] = useState(initialState)
    const [messages, setMessages] = useState(initialState)
    const [auth, setAuth] = useContext(UserContext)

    const handleChange = event => {
        setForm({
            ...form,
            [event.target.getAttribute("name")]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        var data = Object.assign(form, {password: form.password})

        fetch("http://127.0.0.1:8000/api/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            if(json["token"] == null){
                let key = Object.keys(json)[0]

                setMessages({
                    ...initialState,
                    [key]: json[key][0]
                })

                throw new Error("Error")
            } else {
                localStorage.setItem("token", json["token"])
                setAuth({
                    ...auth,
                    token: json["token"],
                    user: json["user"],
                    isAuthenticated: json["user"] != null,
                })
            }
        })
        .catch(err => console.log(err))
    }

    const UserIcon = <FontAwesomeIcon icon="user-circle" className="input-icon" />
    const EmailIcon = <FontAwesomeIcon icon="envelope" 
    className="input-icon" />
    const IdCardIcon = <FontAwesomeIcon icon="id-card" 
    className="input-icon" />
    const LockedIcon = <FontAwesomeIcon icon="lock" 
    className="input-icon" />
    const GreenLockedIcon = <FontAwesomeIcon icon="lock" 
    className="input-icon input-icon--green" />
    const UnlockedIcon = <FontAwesomeIcon icon="lock-open" 
    className="input-icon" />

    return(
        <section className="form-container">
            <h2 className="form-header">Create an Account</h2>
            <form 
            method="POST" 
            action="http:/127.0.0.1:8000/api/auth/register"
            className="register-form"
            onSubmit={handleSubmit}
            >
                <TextInput 
                required 
                id={"reg-username"} 
                name={"username"} 
                placeholder={"Username"}
                icon={UserIcon} 
                message={messages.username}
                handleChange={handleChange}/>

                <TextInput 
                required 
                id={"reg-email"} 
                name={"email"} 
                placeholder={"Email"}                    
                icon={EmailIcon}
                message={messages.email}
                handleChange={handleChange}/>

                <TextInput 
                id={"first_name"} 
                name={"first_name"} 
                placeholder={"First Name"}
                icon={IdCardIcon}
                message={messages.firstName}
                handleChange={handleChange}/>

                <TextInput 
                id={"last_name"} 
                name={"last_name"}
                placeholder={"Last Name"}
                icon={IdCardIcon} 
                message={messages.lastName}
                handleChange={handleChange}/>

                <TextInput 
                required
                id={"reg-password"} 
                name={"password"} 
                type={"password"} 
                placeholder={"Password"}    
                icon={(form.password === form.password2) && form.password
                ? GreenLockedIcon : LockedIcon} 
                message={messages.password}
                handleChange={handleChange}/>

                <TextInput 
                required
                id={"reg-password2"} 
                name={"password2"} 
                type={"password"} 
                placeholder={"Confirm Password"}
                icon={(form.password === form.password2) && form.password
                ? GreenLockedIcon : UnlockedIcon}
                message={messages.password2}
                handleChange={handleChange} />    

                <Button 
                type="submit"
                children={"Sign Up"}
                />            
            </form>
            <p>
                Already have an account? Click <Link to="/login" children={" here"}/> to login.
            </p> 
        </section>
    )
}