import {getCookie} from "../utils"

import "../../scss/location/delete.scss"

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")

    form.addEventListener("submit", event => {
        event.preventDefault()

        let csrftoken = getCookie("csrftoken")
        let input = document.createElement("input")
        input.setAttribute("type", "hidden")
        input.setAttribute("name", "csrfmiddlewaretoken")
        input.setAttribute("value", csrftoken)
        event.target.appendChild(input)

        event.target.submit()
    })
})