import "./components/text-field"
import "./components/checkbox-field"
import "./components/select-field"
import "./components/cards/location-card"

import "../scss/explore.scss"
import "../scss/forms.scss"

import {getCookie, lookup} from "./utils"

var selectedServices = []
var selectedDays = []

const loadServices = function(json) {
    var serviceSelect = document.querySelector("[name='services-filter']")
    for(let obj of json) {
        let markup = `<option value='${obj.id}'>${obj.service_category.name} - ${obj.name}</option>`
        serviceSelect.innerHTML += markup        
    }   
}

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
    console.log("results")
    console.log(results)
    if(results.length > 0) {
        for(let res of results) {
            let reviewStats = fetch(`http://127.0.0.1:8000/api/review_stats/?location=${res.slug}`)
            .then(response => response.json())
            .then(json => {
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
                        <input type="hidden" class="avg-reviews" value="${json['average_rating']}">
                        <input type="hidden" class="total-reviews" value="${json['total_reviews']}">
                    </location-card>
                `
                root.innerHTML += markup
            })
        }
    } else {
        console.log("here")
        let results = document.querySelector(".results")
        let markup = `<p>No locations found.</p>`
        results.innerHTML = markup
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#search-form")
    const results = document.querySelector(".results")
    var serviceSelect = document.querySelector("[name='services-filter']")
    var daySelect = document.querySelector("[name='days-filter']")

    lookup("services", loadServices, { method: "GET" })

    serviceSelect.addEventListener("mousedown", event => {
        event.preventDefault()

        var selectedList = document.querySelector(".services-selected")

        let opt = event.target
        let top = opt.parentNode.scrollTop
        opt.selected = !opt.selected

        if(opt.selected) {
            let markup = `
                <li data-value="${opt.value}">
                    ${opt.textContent}
                </li>
            `                
            selectedList.innerHTML += markup
        } else {
            let elem = selectedList.querySelector(`li[data-value='${opt.value}']`)

            selectedList.removeChild(elem)
        }

        setTimeout(() => {
            opt.parentNode.scrollTop = top, 0
        })

        opt.parentNode.focus()
    })

    serviceSelect.addEventListener("mousemove", event => {
        event.preventDefault()
    }) 
    
    daySelect.addEventListener("mousedown", event => {
        event.preventDefault()

        var selectedList = document.querySelector(".days-selected")

        let opt = event.target
        let top = opt.parentNode.scrollTop
        opt.selected = !opt.selected

        if(opt.selected) {
            let markup = `
                <li data-value="${opt.value}">
                    ${opt.textContent}
                </li>
            `                
            selectedList.innerHTML += markup
        } else {
            let elem = selectedList.querySelector(`li[data-value='${opt.value}']`)

            selectedList.removeChild(elem)
        }

        setTimeout(() => {
            opt.parentNode.scrollTop = top, 0
        })

        opt.parentNode.focus()
    })

    daySelect.addEventListener("mousemove", event => {
        event.preventDefault()
    })        

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
        let serviceFilter = document.querySelector("[name='services-filter']")
        let dayFilter = document.querySelector("[name='days-filter']")

        let services = []
        for(let opt of serviceFilter.querySelectorAll("option")) {
            if(opt.selected)
                services.push(opt.value)
        }
        let days = []
        for(let opt of dayFilter.querySelectorAll("option")) {
            if(opt.selected)
                days.push(opt.value)
        }
    
        let options = {
            radius: radius.value,
        }
        if(address.value.length == 5)
            options["zipcode"] = address.value
        else
            options["address"] = address.value
        if(services.length != 0)
            options["services"] = services
        if(days.length != 0)
            options["days"] = days

        console.log(options)

        let params = new URLSearchParams(options)
        
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