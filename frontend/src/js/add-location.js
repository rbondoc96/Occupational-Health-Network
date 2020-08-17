import "../scss/add-location.scss"
import "../scss/modals.scss"

const lookup = function(endpoint, callback, options) {
    let apiUrl = "http://127.0.0.1:8000/api/" + endpoint + "/"
    fetch(apiUrl, options)
    .then(response => response.json())
    .then(json => callback(json))
}

const loadClinicTypes = function(json) {
    let clinicTypeSelect = document.querySelector("[name='clinic-type']")
    for(let obj of json) {
        let markup = `<option value='${obj.id}'>${obj.name}</option>`
        clinicTypeSelect.innerHTML += markup
    }
    clinicTypeSelect.querySelector("option:last-child").setAttribute("selected", true)
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
            <div class='checkbox-field'>
                <input type='checkbox' value='${obj.id}' name='${obj.name}' id='auth-method-${obj.name}'>
                <label for='auth-method-${obj.name}'>${obj.name}</label>
            </div>
        `
        wrapper.innerHTML += markup
    }
}

const loadCocsAccepted = function(json) {
    let wrapper = document.getElementById("coc-forms__wrapper")
    for(let obj of json) {
        let markup = `
            <div class='checkbox-field'>
                <input type='checkbox' value='${obj.id}' name='${obj.name}' id='coc-accepted-${obj.name}'>
                <label for='coc-accepted-${obj.name}'>${obj.name}</label>
            </div>
        `
        wrapper.innerHTML += markup
    }
}

const initInputMasks = function() {
    Inputmask({
        "mask": "99999"
    }).mask(document.querySelector("[name='zipcode']"))

    Inputmask({
        "mask": "(999) 999-9999[ ext. 99[9[9[9[9]]]]]"
    }).mask(document.querySelector("[name='phone']"))

    Inputmask({
        "mask": "(999) 999-9999"
    }).mask(document.querySelector("[name='fax']"))

    Inputmask({
        "mask": "(999) 999-9999"
    }).mask(document.querySelector("[name='contact-phone']"))

    let times = document.querySelectorAll(".time")
    for(let elem of times) {
        Inputmask({
            alias: "datetime",
            placeholder: "__:__ AM",
            inputFormat: "hh:MM TT",
            hourFormat: 12,
        }).mask(elem)
    }
}

const isValidTimeRange = function(time1, time2) {
    
}

const validateServiceHoursForm = function(form) {
    let service = form.querySelector("[name='simple-services']")
    let startTime = form.querySelector("[name='service-start-time']")
    let endTime = form.querySelector("[name='service-end-time']")


    if(startTime.value == "") {
        startTime.classList.add("invalid--blank")
    } else {
        startTime.classList.remove("invalid--blank")
    }
    if(endTime.value == "") {
        endTime.classList.add("invalid--blank")
    } else {
        endTime.classList.remove("invalid--blank")
    }

    let blanks = form.querySelectorAll(".invalid--blank")

    return blanks.length <= 0
}

const validateBusinessHoursForm = function(form) {
    let startTime = form.querySelector("[name='business-start-time']")
    let endTime = form.querySelector("[name='business-end-time']")

    if(startTime.value == "") {
        startTime.classList.add("invalid--blank")
    } else {
        startTime.classList.remove("invalid--blank")
    }
    if(endTime.value == "") {
        endTime.classList.add("invalid--blank")
    } else {
        endTime.classList.remove("invalid--blank")
    }

    let blanks = form.querySelectorAll(".invalid--blank")

    return blanks.length <= 0
}

const validateContactsForm = function(form) {
    let name = form.querySelector("[name='contact-name']")

    if(name.value == "") {
        name.classList.add("invalid--blank")
    } else {
        name.classList.remove("invalid--blank")
    }

    let blanks = form.querySelectorAll(".invalid--blank")

    return blanks.length <= 0
}

const renderServiceHoursList = function(form) {
    let wrapper = form.nextElementSibling
    let list = wrapper.querySelector("ul")

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

    let markup
    if(days.length > 0) 
        /* Dictionary is unformatted to avoid \r and \n characters */
        markup = `
            <li class='sublist-entry'>
                <input
                type="hidden"
                name="service-hours-input"
                value='{"service": "${serviceSelect.value}","start_time": "${startTime.value}","end_time": "${endTime.value}","days": [${dayIDs.join(", ")}]}'
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
            name="service-hours-input"
            value='{"service": "${serviceSelect.value}","start_time": "${startTime.value}","end_time": "${endTime.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${service.textContent}: </span>
                <span>${startTime.value} to ${endTime.value}</span>
            </div>
        </li>
        `
    
    list.innerHTML += markup

    if(list.querySelectorAll("li").length > 0) {
        wrapper.style.display = "block"
    } else {
        wrapper.style.display = "none"
    }
}

const renderBusinessHoursList = function(form) {
    let wrapper = form.nextElementSibling
    let list = wrapper.querySelector("ul")

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
                name="business-hours-input"
                value='{"day": "${daySelect.value}","start_time": "${startTime.value}", "end_time": "${endTime.value}"}'
                >
                <div class='sublist-entry-line1'>
                    <span>${day.name}: </span>
                    <span>${startTime.value} - ${endTime.value}</span>
                </div>
            </li>
        `
    
    list.innerHTML += markup

    if(list.querySelectorAll("li").length > 0) {
        wrapper.style.display = "block"
    } else {
        wrapper.style.display = "none"
    }
}

const renderContactsList = function(form) {
    let wrapper = form.nextElementSibling
    let list = wrapper.querySelector("ul")

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
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "email": "${email.value}", "phone": "${phone.value}"}'
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? `- ${title.value}` : ''} </span>
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
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "email": "${email.value}"}'
            >
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
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}", "phone": "${phone.value}"}'
            >
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
            name="contacts-input"
            value='{"name": "${name.value}", "title": "${title.value}"}'
            >
            >
            <div class='sublist-entry-line1'>
                <span>${name.value}${(title.value != "") ? `- ${title.value}` : ''} </span>
            </div>
        </li>
    `
    }
    
    list.innerHTML += markup

    if(list.querySelectorAll("li").length > 0) {
        wrapper.style.display = "block"
    } else {
        wrapper.style.display = "none"
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

    initInputMasks()

    let form = document.getElementById("location-form")
    let formSubmit = document.getElementById("submit-button")

    let serviceHoursToggle = document.getElementById("service-hours-toggle")
    let businessHoursToggle = document.getElementById("business-hours-toggle")
    let contactsToggle = document.getElementById("contacts-toggle")

    let serviceHoursButton = document.getElementById("service-hours-submit")
    let businessHoursButton = document.getElementById("business-hours-submit")
    let contactsButton = document.getElementById("contacts-submit")

    form.addEventListener("submit", function(event) {
        event.preventDefault()

        let pseudoInputs = event.target.getElementsByClassName("no-send")
        console.log(pseudoInputs)
        for(let input of pseudoInputs) {
            input.setAttribute("disabled", true)
            console.log(input)
        }

        event.target.submit()
    })

    serviceHoursButton.addEventListener("click", function(event) {
        let form = document.getElementById("service-hours-form")

        if(validateServiceHoursForm(form) == true){
            renderServiceHoursList(form)
        } else {
            alert("Please fix the Service Hour errors!")
        }
    })
    businessHoursButton.addEventListener("click", function(event) {
        let form = document.getElementById("business-hours-form")

        if(validateBusinessHoursForm(form) == true){
            renderBusinessHoursList(form)
        } else {
            alert("Please fix the Business Hour errors!")
        }
    })   
    contactsButton.addEventListener("click", function(event) {
        let form = document.getElementById("contacts-form")

        if(validateContactsForm(form) == true){
            renderContactsList(form)
        } else {
            alert("Please fix the Contacts errors!")
        }
    })     

    serviceHoursToggle.addEventListener("click", function(event) {
        let form = document.getElementById("service-hours-form")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
        } else {
            form.style.display = "none"
        }
    })
    businessHoursToggle.addEventListener("click", function(event) {
        let form = document.getElementById("business-hours-form")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
        } else {
            form.style.display = "none"
        }
    })
    contactsToggle.addEventListener("click", function(event) {
        let form = document.getElementById("contacts-form")
        if(form.style.display == "none" || form.style.display == "") {
            form.style.display = "block"
        } else {
            form.style.display = "none"
        }
    })
})