import "./components/text-field"
import "./components/select-field"
import "./components/checkbox-field"

import {getCookie} from "./utils"

import "../scss/login.scss"


const validatePassword = function(password) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/


    return regex.test(password)
}

const validateRegisterForm = function(form) {
    let requiredFields = form.querySelectorAll(".required + input")
    let isFormValid = true
    for(let input of requiredFields) {
        let error = input.nextElementSibling
        if(input.value == "") {
            isFormValid = false
            input.classList.add("invalid--blank")
            error.style.display = "block"
        } else if (input.classList.contains("invalid--blank"))  {
            isFormValid = true
            input.classList.remove("invalid--blank")
            error.style.display = "none"
        }
    }

    let password = form.querySelector("[name='reg-password']")
    let container = password.parentNode

    let confirmPassword = form.querySelector("[name='reg-confirm-password']")
    let confirmContainer = confirmPassword.parentNode

    if(!validatePassword(password.value)) {
        isFormValid = false
        container.setErrorMessage("Invalid password format. Must contain at least 1 special character, 1 uppercase character, 1 lowercase character, 1 digit, and at least 8 characters.")
        container.hideDescription()
    } else {
        isFormValid = true
        container.hideError()

        if(password.value !== confirmPassword.value) {
            isFormValid = false
    
            confirmContainer.setErrorMessage("The passwords must match.")
            confirmContainer.hideDescription()
        } else {
            isFormValid = true
            confirmContainer.hideError()
        }
    }


    return isFormValid
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form")
    const regForm = document.getElementById("register-form")

    const regUser = document.getElementById("reg-username")
    const loginPWToggle = document.getElementById("login-password-toggle")
    const regPWToggle = document.getElementById("reg-password-toggle")

    const disclaimerLink = document.getElementById("disclaimer-link")

    let timeout = null
    
    let apiUrl = "http://127.0.0.1:8000/api/user_types/"
    fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => {
        let userTypeSelect = document.getElementById("user-type")
        for(let obj of json) {
            let markup = `<option value="${obj.id}">${obj.name}</option>`

            userTypeSelect.innerHTML += markup
        }
    })

    regUser.addEventListener("keyup", event => {

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            let message = fetch(`/api/exists/?username=${event.target.value}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                let doesUserExist = Boolean(json["message"])
                let wrapper = event.target.parentNode
        
                if(doesUserExist) {
                    wrapper.setErrorMessage("User already exists!")
                    wrapper.hideDescription()
                } else {
                    wrapper.hideError()
                }
            })
        }, 500)
    })

    loginPWToggle.addEventListener("click", event => {
        let password = document.getElementById("login-password")
        if(event.target.checked) {
            password.setAttribute("type", "text")
        } else {
            password.setAttribute("type", "password")
        }
    })

    regPWToggle.addEventListener("click", event => {
        let password = document.getElementById("reg-password")
        let confirmPassword = document.getElementById("reg-confirm-password")
        if(event.target.checked) {
            password.setAttribute("type", "text")
            confirmPassword.setAttribute("type", "text")
        } else {
            password.setAttribute("type", "password")
            confirmPassword.setAttribute("type", "password")
        }
    })

    loginForm.addEventListener("submit", event => {
        let csrftoken = getCookie("csrftoken")

        let input = document.createElement("input")
        input.setAttribute("type", "hidden")
        input.setAttribute("name", "csrfmiddlewaretoken")
        input.setAttribute("value", csrftoken)

        event.target.appendChild(input)
        event.target.submit()
    })

    regForm.addEventListener("submit", event => {
        event.preventDefault()

        let regDisclaimer = event.target.querySelector("#disclaimer-ack")

        if(!regDisclaimer.checked) {
            alert("Please acknowledge that you've read the disclaimer")
        }
        else if(validateRegisterForm(event.target) == true) {
            let csrftoken = getCookie("csrftoken")

            let input = document.createElement("input")
            input.setAttribute("type", "hidden")
            input.setAttribute("name", "csrfmiddlewaretoken")
            input.setAttribute("value", csrftoken)

            event.target.appendChild(input)
            event.target.submit()
        }
    })

    disclaimerLink.addEventListener("click", event => {
        window.open("/popups/disclaimer", "_blank", `
            location=yes,
            height=800,
            width=700, 
            top=${(screen.height - 800) / 4}
            left=${(screen.width - 700) / 2}
        `)
    })
})