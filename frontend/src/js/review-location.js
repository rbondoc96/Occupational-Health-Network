import "./components/text-field"
import "./components/select-field"
import {lookup, getCookie} from "./utils"

import "../scss/popups/review-location.scss"
import "../scss/forms.scss"

import Logo from "../assets/nav full.svg"


const setStarsFill = function(wrapper) {
    let stars = wrapper.querySelectorAll("[name='rating']")

    for(let star of stars) {     
        star.addEventListener("click", event => {
            let self = event.target
            if(self.checked) {
                let svg = self.nextElementSibling.querySelector("svg path")
                svg.style.fill = "#C0D735"

                let prevSibling = self.parentNode.previousElementSibling
                while(prevSibling != null) {
                    console.log(prevSibling)                       
                    let svg = prevSibling.querySelector("label svg path")
                    svg.style.fill = "#C0D735"
                    prevSibling = prevSibling.previousElementSibling                
                }
                
                let nextSibling = self.parentNode.nextElementSibling
                while(nextSibling != null) {
                    let svg = nextSibling.querySelector("label svg path")
                    svg.style.fill = "#CCC"
                    nextSibling = nextSibling.nextElementSibling                
                }   
            }
        })       
    }
}

const populateLocationInfo = function(json) {
    console.log(json)
    let locationName = document.getElementById("location-name")
    locationName.textContent = (json["branch_name"] != null) ? 
        `${json['name']} - ${json['branch_name']}` :
        json["name"]

    let location_id = `<input type="hidden" name="location" value=${json["id"]}>`
    locationName.insertAdjacentHTML("beforeend", location_id)
}

document.addEventListener("DOMContentLoaded", () => {
    const slug = window.location.pathname.split("/")[2]
    const logo = document.getElementById("logo")

    const form = document.querySelector("form")
    const starsWrapper = document.querySelector(".ratings__stars")
    
    logo.setAttribute("src", Logo)

    lookup(`locations/${slug}`, populateLocationInfo, {
        method: "GET"
    })

    let today = new Date()
    document.getElementById("todays-date").textContent = today.toDateString()    

    setStarsFill(starsWrapper)

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