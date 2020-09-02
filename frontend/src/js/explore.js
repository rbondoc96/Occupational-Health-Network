import "./components/text-field"
import "./components/checkbox-field"
import "./components/select-field"
import "./components/location-card"

import "../scss/explore.scss"
import "../scss/forms.scss"

import {getCookie} from "./utils"

const getOpenStatus = function(start, end) {
    let now = new Date()
    let mins = now.getMinutes()
    let hours = now.getHours()

    let startTokens = start.split(":")
    let startHour = startTokens[0]
    let startMins = startTokens[1]
    
    let endTokens = end.split(":")
    let endHour = endTokens[0]
    let endMins = endTokens[1]

    console.log(startTokens)
    console.log(endTokens)

    if((hours > endHour || hours < startHour) || (start == "23:59:00" && end == "23:59:00"))
        return "Closed"
    else if(endHour - hours == 1) {
        if(endMins - mins > 0)
            return "Closing Soon"
    }
    else if (hours == endHour) {
        if(endMins - min > 0)
            return "Closing Soon"
        else
            return "Currently Closed"
    } else if (hours == startHour) {
        if(min > startMins)
            return "Currently Open"
        else
            return "Currently Closed"
    } else
        return "Currently Open"
        
}
const renderResults = function(root, results) {
    root.innerHTML = ""
    for(let res of results) {
        console.log(res)

        let markup = `
            <location-card>
                <span slot="clinic-name">${res.name}</span>
                ${(res.branch_name != "" && res.branch_name != null) ? 
                    `<span slot="branch-name"> - ${res.branch_name}</span>` : ""
                }
                <span slot="street1">${res.street_line_1}</span>
                ${(res.street_line_2 != "" && res.street_line_2 != null) ? 
                    `<span slot="street2">${res.street_line_2}</span>` : ""
                }
                <span slot="street3">${res.city}, ${res.state} ${res.zipcode}</span>
                <span slot="phone">${res.phone}</span>
                <span slot="fax">${res.fax}</span>
                <span slot="is-open"></span>
                <a href="/locations/${res.slug}" slot="detail-link" target="_blank">
                    <button type="button" class="button button-primary--blue">
                        Clinic Details
                    </button>
                </a>
                <a href="#" slot="review-link" data-slug="${res.slug}">
                    <button type="button" class="button button-secondary--blue">
                        Submit a Review
                    </button>
                </a>
            </location-card>
        `

        root.innerHTML += markup
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#search-form")
    const results = document.querySelector(".results")

    form.addEventListener("submit", event => {
        event.preventDefault()

        let csrftoken = getCookie("csrftoken")
        let input = document.createElement("input")
        input.setAttribute("type", "hidden")
        input.setAttribute("name", "csrfmiddlewaretoken")
        input.setAttribute("value", csrftoken)
        event.target.appendChild(input)

        let address = document.getElementById("address")
        let radius = document.getElementById("radius")

        let params = (address.value.length == 5) ? 
            new URLSearchParams({
                zipcode: address.value,
                radius: radius.value,
            }) :
            new URLSearchParams({
                address: address.value,
                radius: radius.value,
            })
        
        let response = fetch(
            "http://127.0.0.1:8000/api/search/?" + 
            params
        )
        .then(response => response.json())
        .then(json => {
            renderResults(results, json)
        })
    })
    
})