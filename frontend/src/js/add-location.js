import "./components/text-field"
import "./components/select-field"
import "./components/checkbox-field"
import {getCookie, timeRangeToString, lookup} from "./utils"

import "../scss/add-location.scss"
import "../scss/modals.scss"

const daysOfTheWeek = ["__offset__", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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

const validateBusinessHoursForm = function(form) {
    let message
    let day = form.querySelector("[name='business-day']")
    let startTime = form.querySelector("[name='business-start-time']")
    let endTime = form.querySelector("[name='business-end-time']")

    let isDayUnique = true
    if(startTime.value == "") {
        startTime.classList.add("invalid--blank")
        message = "Please specify a start time."
    } else {
        startTime.classList.remove("invalid--blank")
    }
    if(endTime.value == "") {
        endTime.classList.add("invalid--blank")
        message = "Please specify an end time"
    } else {
        endTime.classList.remove("invalid--blank")

        if(!isValidTimeRange(startTime.value, endTime.value)) {
            message = "Please enter a valid time range!"
            startTime.classList.add("invalid--blank")
            endTime.classList.add("invalid--blank")
        } else {
            startTime.classList.remove("invalid--blank")
            endTime.classList.remove("invalid--blank")

            let entries = document.querySelectorAll("[name='business-hours-input']")
            if(entries.length > 0) {
                let days = new Set()
        
                for(let item of entries) 
                    days.add(item.getAttribute("data-day"))
        
                isDayUnique = !days.has(day.value)
                if(!isDayUnique)
                    message = `An entry for ${daysOfTheWeek[day.value]} already exists!`
            }
        }
    }

    let blanks = form.querySelectorAll(".invalid--blank")
    return ({
        result: (blanks.length <= 0 && isDayUnique),
        message: message
    })
}

const validateContactsForm = function(form) {
    let name = form.querySelector("[name='contact-name']")

    let isContactUnique = true
    let message

    if(name.value == "") {
        name.classList.add("invalid--blank")
        message = "Please enter a name."
    } else {
        name.classList.remove("invalid--blank")

        let entries = document.querySelectorAll("[name='contacts-input']")
        if(entries.length > 0) {
            let names = new Set()
    
            for(let item of entries) 
                names.add(item.getAttribute("data-name"))
    
            isContactUnique = !names.has(name.value)
            if(!isContactUnique)
                message = `An entry for ${name.value} already exists!`
        }
    }

    let blanks = form.querySelectorAll(".invalid--blank")

    return ({
        result: (blanks.length <= 0 && isContactUnique),
        message: message
    })
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

const renderBusinessHoursList = function(form) {
    let hiddenList = form.querySelector(".hidden-list")
    let list = hiddenList.querySelector("ul")

    let daySelect = form.querySelector("[name='business-day']")
    let startTime = form.querySelector("[name='business-start-time']")
    let endTime = form.querySelector("[name='business-end-time']")
    let day

    for(let opt of daySelect.options) {
        if(opt.selected) {
            day = {
                id: opt.value,
                name: opt.textContent
            }
            break
        }
    }

    let markup = `
            <li class='sublist-entry'>
                <input
                type="hidden"
                data-day="${daySelect.value}"
                name="business-hours-input"
                value='{"day": "${daySelect.value}","start_time": "${startTime.value}", "end_time": "${endTime.value}"}'
                >
                <div class='sublist-entry-line1'>
                    <span>${day.name}: </span>
                    <span>${timeRangeToString(startTime.value, endTime.value)}</span>
                </div>
            </li>
        `
    
    list.innerHTML += markup

    let entries = list.querySelectorAll("[name='business-hours-input']")
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

const renderContactsList = function(form) {
    let hiddenList = form.querySelector(".hidden-list")
    let list = hiddenList.querySelector("ul")

    let name = form.querySelector("[name='contact-name']")
    let title = form.querySelector("[name='contact-title']")
    let email = form.querySelector("[name='contact-email']")
    let phone = form.querySelector("[name='contact-phone']")

    let markup
    if(email.value != "" && phone.value != "") {
        markup = `
        <li class='sublist-entry'>
            <input
            type="hidden"
            data-name="${name.value}"
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "email": "${email.value}", "phone": "${phone.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? ` - ${title.value}` : ''} </span>
            </div>
            <div class='sublist-entry-line2'>
                <span>Email: </span>
                <span>${email.value}</span>
            </div>
            <div class='sublist-entry-line3'>
                <span>Phone: </span>
                <span>${phone.value}</span>
            </div>
        </li>
    `
    } else if(email.value != "" && phone.value == "") {
        markup = `
        <li class='sublist-entry'>
            <input
            type="hidden"
            data-name="${name.value}"
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "email": "${email.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? `- ${title.value}` : ''} </span>
            </div>
            <div class='sublist-entry-line2'>
                <span>Email: </span>
                <span>${email.value}</span>
            </div>
        </li>
    `
    } else if(email.value == "" && phone.value != "") {
        markup = `
        <li class='sublist-entry'>
            <input
            type="hidden"
            data-name="${name.value}"
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "phone": "${phone.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? `- ${title.value}` : ''} </span>
            </div>
            <div class='sublist-entry-line2'>
                <span>Phone: </span>
                <span>${phone.value}</span>
            </div>
        </li>
    `
    } else {
        markup = `
        <li class='sublist-entry'>
            <input
            type="hidden"
            data-name="${name.value}"
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? `- ${title.value}` : ''} </span>
            </div>
        </li>
    `
    }
    
    list.innerHTML += markup
    
    let entries = list.querySelectorAll("[name='contacts-input']")
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

document.addEventListener("DOMContentLoaded", function() {
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

    let form = document.getElementById("location-form")
    let formSubmit = document.getElementById("submit-button")

    let serviceHoursToggle = document.getElementById("service-hours-toggle")
    let businessHoursToggle = document.getElementById("business-hours-toggle")
    let contactsToggle = document.getElementById("contacts-toggle")

    let businessStartTime = document.querySelector("[name='business-start-time']")
    let businessEndTime = document.querySelector("[name='business-end-time']")
    let isClosedToggle = document.getElementById("is-closed")
    let is24HoursToggle = document.getElementById("is-24hours")

    let serviceHoursButton = document.getElementById("service-hours-submit")
    let businessHoursButton = document.getElementById("business-hours-submit")
    let contactsButton = document.getElementById("contacts-submit")

    form.addEventListener("submit", function(event) {
        event.preventDefault()

        let pseudoInputs = event.target.getElementsByClassName("no-send")
        for(let input of pseudoInputs)
            input.disabled = true

        let csrftoken = getCookie("csrftoken")
        let input = document.createElement("input")
        input.setAttribute("type", "hidden")
        input.setAttribute("name", "csrfmiddlewaretoken")
        input.setAttribute("value", csrftoken)
        event.target.appendChild(input)
        
        event.target.submit()
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
    businessHoursButton.addEventListener("click", function(event) {
        let form = document.getElementById("business-hours-form")
        let selectField = form.querySelector("select-field")

        let response = validateBusinessHoursForm(form)
        if(response.result == true){
            selectField.hideError()
            renderBusinessHoursList(form)
        } else {
            selectField.setErrorMessage(response.message)
            selectField.hideDescription()
        }
    })   
    contactsButton.addEventListener("click", function(event) {
        let form = document.getElementById("contacts-form")
        let selectField = form.querySelector("text-field")

        let response = validateContactsForm(form)
        if(response.result == true){
            selectField.hideError()
            renderContactsList(form)
        } else {
            selectField.setErrorMessage(response.message)
            selectField.hideDescription()
        }
    })     

    isClosedToggle.addEventListener("change", function(event) {
        if(event.target.checked) {
            is24HoursToggle.disabled = true
            businessStartTime.disabled = true
            businessEndTime.disabled = true

            businessStartTime.value = "11:59 PM"
            businessEndTime.value = "11:59 PM"
        } else {
            is24HoursToggle.disabled = false
            businessStartTime.disabled = false
            businessEndTime.disabled = false

            businessStartTime.value = ""
            businessEndTime.value = ""
        }
    })

    is24HoursToggle.addEventListener("change", function(event) {
        if(event.target.checked) {
            isClosedToggle.disabled = true
            businessStartTime.disabled = true
            businessEndTime.disabled = true

            businessStartTime.value = "12:00 AM"
            businessEndTime.value = "12:00 AM"
        } else {
            isClosedToggle.disabled = false
            businessStartTime.disabled = false
            businessEndTime.disabled = false

            businessStartTime.value = ""
            businessEndTime.value = ""
        }
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
    businessHoursToggle.addEventListener("click", function(event) {
        let form = document.querySelector("#business-hours-form .subform-content")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
            event.target.textContent = "Hide Form"
        } else {
            form.style.display = "none"
            event.target.textContent = "Add a Day"
        }
    })
    contactsToggle.addEventListener("click", function(event) {
        let form = document.querySelector("#contacts-form .subform-content")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
            event.target.textContent = "Hide Form"
        } else {
            form.style.display = "none"
            event.target.textContent = "Add a Contact"
        }
    })
})