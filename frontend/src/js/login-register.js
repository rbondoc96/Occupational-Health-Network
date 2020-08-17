import "../scss/login.scss"

import {getCookie} from "./utils"

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
    let confirmPassword = form.querySelector("[name='reg-confirm-password']")
    let errorWrapper = confirmPassword.nextElementSibling

    console.log(password)
    console.log(confirmPassword)
    if(password.value !== confirmPassword.value) {
        isFormValid = false

        let errorMessage = errorWrapper.querySelector(".error-message")
        errorMessage.textContent = "The passwords must match."
        
        errorWrapper.style.display = "block"
    } else {
        isFormValid = true
        errorWrapper.style.display = "none"
    }

    return isFormValid
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form")
    const regForm = document.getElementById("register-form")
    
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

    regForm.addEventListener("submit", event => {
        event.preventDefault()

        let regDisclaimer = event.target.querySelector("#disclaimer-ack")

        if(!regDisclaimer.checked) {
            alert("Please acknowledge that you've read the disclaimer")
        }
        else if(validateRegisterForm(event.target) == true) {
            event.target.submit()
        }
    })
})