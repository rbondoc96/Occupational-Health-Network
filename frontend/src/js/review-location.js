import "./components/text-field"
import {lookup} from "./utils"

import "../scss/review-location.scss"
import "../scss/forms.scss"

import Logo from "../assets/nav full.svg"

const populateLocationInfo = function(json) {
    console.log(json)
    let locationName = document.getElementById("location-name")
    locationName.textContent = (json["branch_name"] != null) ? 
        `${json['name']} - ${json['branch_name']}` :
        json["name"]
}

document.addEventListener("DOMContentLoaded", () => {
    const slug = window.location.pathname.split("/")[2]
    const logo = document.getElementById("logo")
    const reviewType = document.querySelector("[name='review-type']")
    const reviewTypeText = document.getElementById("review-type--text")
    
    if(reviewType.getAttribute("data-user-type").includes("Employer")) {
        reviewTypeText.textContent = "Administrative Review"
        reviewType.setAttribute("value", 2)
    } else {
        reviewTypeText.textContent = "Patient Review"
        reviewType.setAttribute("value", 1)
    }
    
    logo.setAttribute("src", Logo)

    lookup(`locations/${slug}`, populateLocationInfo, {
        method: "GET"
    })
})