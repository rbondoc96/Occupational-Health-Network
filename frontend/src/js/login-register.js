import "../scss/login.scss"

import {getCookie} from "./utils"

const getJwtToken = async function() {
    let username = document.getElementById("login-username").value
    let password = document.getElementById("login-password").value

    let apiUrl = window.origin + "/api/token/"
    var token = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(response => {
        return response.json()
    })

    console.log(token)
}

const restoreJwtToken = async function() {

    let apiUrl = window.origin + "/api/token/refresh/"
    var token = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh: refresh,
        })
    }).then(response => {
        return response.json()
    })

    console.log(token)
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form")
    const loginButton = document.getElementById("login-button")

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault()

        getJwtToken()
    })
})