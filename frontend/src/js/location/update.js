import "../components/text-field"
import "../components/select-field"
import "../components/checkbox-field"

import {lookup, getCookie} from "../utils" 

import "../../scss/forms.scss"
import "../../scss/location/update.scss"

const loadClinicTypes = function(json) {
    let clinicTypeSelect = document.querySelector("[name='clinic-type']")
    for(let obj of json) {
        let markup = `<option value='${obj.id}'>${obj.name}</option>`
        clinicTypeSelect.innerHTML += markup
    }
}

const loadServices = function(json) {
    let serviceSelect = document.querySelector("[name='services']")
    let simpleServiceSelect = document.querySelector("[name='simple-services']")
    let names = new Set()
    for(let obj of json) {
        let markup = `<option value='${obj.id}'>${obj.service_category.name} - ${obj.name}</option>`
        serviceSelect.innerHTML += markup

        let simple_name = obj.simple_name
        if(!names.has(simple_name) && simple_name != null) {
            names.add(simple_name)
            let simpleMarkup = `<option value='${obj.id}'>${obj.simple_name}</option>`
            simpleServiceSelect.innerHTML += simpleMarkup
        }
    }
}

const loadAuthMethods = function(json) {
    let wrapper = document.getElementById("auth-methods__wrapper")
    for(let obj of json) {
        let markup = `
            <checkbox-field>
                <label slot="label" for='auth-method-${obj.name}'>${obj.name}</label>
                <input
                slot="input" 
                type='checkbox' 
                value='${obj.id}' 
                name='auth-method' 
                id='auth-method-${obj.name}'>
            </checkbox-field>
        `
        wrapper.innerHTML += markup
    }
}

const loadCocsAccepted = function(json) {
    let wrapper = document.getElementById("coc-forms__wrapper")
    for(let obj of json) {
        let markup = `
            <checkbox-field>
                <label slot="label" for='coc-accepted-${obj.name}'>${obj.name}</label>
                <input 
                slot="input"
                type='checkbox' 
                value='${obj.id}' 
                name='coc-method' 
                id='coc-accepted-${obj.name}'>
            </checkbox-field>
        `
        wrapper.innerHTML += markup
    }
}

const twelveHourTimeToMinutes = function(time) {
    if(time === "12:00 AM" || time === "")
        return 0
    else {
        let tokens = time.split(" ")
        let hrMin = tokens[0].split(":")
        
        let hours = parseInt(hrMin[0])
        let mins = parseInt(hrMin[1])
        let meridiem = tokens[1]
    
        if(meridiem === "PM" && hours != 12) {
            hours += 12
        } else if (meridiem === "AM" && hours == 12) {
            hours -= 12
        }

        console.log((60 * hours) + mins)

        return (60 * hours) + mins
    }
}

const isValidTimeRange = function(time1, time2) {
    if(time1 === "12:00 AM" && time2 === "12:00 AM")
        return true
    else if(time1 === "11:59 PM" && time2 === "11:59 PM")
        return true
    else {
        let mins1 = twelveHourTimeToMinutes(time1)
        let mins2 = twelveHourTimeToMinutes(time2)

        return mins1 < mins2
    }
}

const validateServiceHoursForm = function(form) {
    let service = form.querySelector("[name='simple-services']")
    let startTime = form.querySelector("[name='service-start-time']")
    let endTime = form.querySelector("[name='service-end-time']")

    let isServiceUnique = true
    let message

    if(startTime.value == "") {
        startTime.classList.add("invalid--blank")
        message = "Please specify a start time!"
    } else {
        startTime.classList.remove("invalid--blank")

        if(endTime.value == "") {
            endTime.classList.add("invalid--blank")
            message = "Please specify an end time!"
        } else {
            endTime.classList.remove("invalid--blank")
    
            if(!isValidTimeRange(startTime.value, endTime.value)) {
                message = "Please enter a valid time range!"
                startTime.classList.add("invalid--blank")
                endTime.classList.add("invalid--blank")
            } else {
                startTime.classList.remove("invalid--blank")
                endTime.classList.remove("invalid--blank")
    
                let entries = document.querySelectorAll("[name='service-hours-input']")
                if(entries.length > 0) {
                    let services = new Set()
            
                    for(let item of entries) 
                        services.add(item.getAttribute("data-service"))
            
                    isServiceUnique = !services.has(service.value)
                    if(!isServiceUnique)
                        message = `An entry for that service already exists!`
                }
            }
        }        
    }

    let blanks = form.querySelectorAll(".invalid--blank")

    return {
        result: (blanks.length <= 0 && isServiceUnique),
        message: message
    }
}

const renderServiceHoursList = function(form) {
    let hiddenList = form.querySelector(".hidden-list")
    let list = hiddenList.querySelector("ul")

    let serviceSelect = form.querySelector("[name='simple-services']")
    let startTime = form.querySelector("[name='service-start-time']")
    let endTime = form.querySelector("[name='service-end-time']")
    let daysSelect = form.querySelector("[name='service-days-offered']")
    let dayIDs = []
    let days = []

    for(let opt of daysSelect.options) {
        if(opt.selected) {
            dayIDs.push(opt.value)
            days.push(opt.textContent)
        }
    }
    
    let service = serviceSelect.options[0]
    for(let opt of serviceSelect.options) {
        if(opt.selected) {
            service = opt
        }
    }

    let serviceName = serviceSelect.querySelector(`option[value='${serviceSelect.value}']`)
    let markup
    if(days.length > 0) 
        /* Dictionary is unformatted to avoid \r and \n characters */
        markup = `
            <li class='sublist-entry col-md-12'>
                <input
                type="hidden"
                data-service="${serviceSelect.value}"
                name="service-hours-input"
                value='{"name": "${serviceName.textContent}","start_time": "${startTime.value}","end_time": "${endTime.value}","days": [${dayIDs.join(", ")}]}'
                >
                <div class='sublist-entry-line1'>
                    <span>${service.textContent}: </span>
                    <span>${startTime.value} - ${endTime.value}</span>
                </div>
                <div class='sublist-entry-line2'>
                    <span>- Days Offered: </span>
                    <span>${days.join(", ")}</span>
                </div>
            </li>
        `
    else 
        markup = `
        <li class='sublist-entry'>
            <input
            type="hidden"
            data-service="${serviceSelect.value}"
            name="service-hours-input"
            value='{"name": "${serviceSelect.value}","start_time": "${startTime.value}","end_time": "${endTime.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${service.textContent}: </span>
                <span>${startTime.value} to ${endTime.value}</span>
            </div>
        </li>
        `
    
    list.innerHTML += markup

    let entries = list.querySelectorAll("[name='service-hours-input']")
    for(let entry of entries) {

        entry.parentNode.ondblclick = function() { 
            let ul = this.parentNode
            ul.removeChild(this) 

            if(ul.querySelectorAll("li").length == 0) 
                ul.parentNode.parentNode.parentNode.style.display = "none"
        }
    }

    if(list.querySelectorAll("li").length > 0) {
        hiddenList.style.display = "block"
    } else {
        hiddenList.style.display = "none"
    }
}

const populateFields = function() {
    const slug = window.location.pathname.split("/")[2]
    lookup(`locations/${slug}`, json => {
        console.log(json)
        const form = document.querySelector("form")
        const servicesOffered = form.querySelector("[name='services']")

        var servicesSelected = document.querySelector(".services-selected")

        form.querySelector("[name='clinic-type']").value = json["location_category"]["id"]
        form.querySelector("[name='clinic-name']").value = json["name"]
        form.querySelector("[name='branch-name']").value = json["branch_name"]
        form.querySelector("[name='street-line-1']").value = json["street_line_1"]
        form.querySelector("[name='street-line-2']").value = json["street_line_2"]
        form.querySelector("[name='city']").value = json["city"]
        form.querySelector("[name='state']").value = json["state"]
        form.querySelector("[name='zipcode']").value = json["zipcode"]
        form.querySelector("[name='phone']").value = json["phone"]
        form.querySelector("[name='fax']").value = json["fax"]
        form.querySelector("[name='is-phone-callable']").checked = json["is_phone_callable"]
        form.querySelector("[name='website']").value = json["website"]
        form.querySelector("[name='comments']").value = json["comments"]

        for(let service of json["service_list"]) {
            let option = servicesOffered.querySelector(`option[value='${service.id}']`).selected = true

            let markup = `
            <li data-value="${service.id}">
                ${service.service_category.name} - ${service.name}
            </li>`

            servicesSelected.innerHTML += markup
        }

        let auths = document.querySelectorAll("[name='auth-method']")
        for(let method of json["auth_method_list"]) {
            for(let auth of auths) {
                if(auth.value == method.id)
                    auth.checked = true
            }
        }

        let cocs = document.querySelectorAll("[name='coc-method']")
        for(let cat of json["ccf_category_list"]) {
            for(let coc of cocs) {
                if(coc.value == cat.id)
                    coc.checked = true
            }
        }

    }, { method: "GET" })
}

document.addEventListener("DOMContentLoaded", () => {
    var serviceSelect = document.querySelector("[name='services']")
    var daySelect = document.querySelector("[name='service-days-offered']")

    var serviceHoursToggle = document.getElementById("service-hours-toggle")
    var serviceHoursButton = document.getElementById("service-hours-submit")

    lookup("location_categories", loadClinicTypes, {
        method: "GET"
    })
    lookup("services", loadServices, {
        method: "GET"
    })
    lookup("auth_methods", loadAuthMethods, {
        method: "GET"
    })
    lookup("ccf_categories", loadCocsAccepted, {
        method: "GET"
    })   
    
    populateFields()

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

        selectedList.innerHTML = ""
        let select = opt.parentNode
        for(let item of select) {
            if(item.selected) {
                let markup = `
                <li data-value="${item.value}">
                    ${item.textContent}
                </li>
                `  
                selectedList.innerHTML += markup
            }
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

        selectedList.innerHTML = ""
        let select = opt.parentNode
        for(let item of select) {
            if(item.selected) {
                let markup = `
                <li data-value="${item.value}">
                    ${item.textContent}
                </li>
                `  
                selectedList.innerHTML += markup
            }
        }          

        setTimeout(() => {
            opt.parentNode.scrollTop = top, 0
        })

        opt.parentNode.focus()
    })

    daySelect.addEventListener("mousemove", event => {
        event.preventDefault()
    })     
    
    serviceHoursToggle.addEventListener("click", function(event) {
        let form = document.querySelector("#service-hours-form .subform-content")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
            event.target.textContent = "Hide Form"
        } else {
            form.style.display = "none"
            event.target.textContent = "Add a Service"
        }
    })
    serviceHoursButton.addEventListener("click", function(event) {
        let form = document.getElementById("service-hours-form")
        let selectField = form.querySelector("select-field")

        let response = validateServiceHoursForm(form)
        if(response.result == true){
            selectField.hideError()
            renderServiceHoursList(form)
        } else {
            selectField.setErrorMessage(response.message)
            selectField.hideDescription()
        }
    })

})