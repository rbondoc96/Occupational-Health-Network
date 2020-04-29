// Django does this to mark the id of an element:
//      field           id (HTML)
//  op_start_min       id_op_start_min
//  op_day2            id_op_day2

var DayRanges = {
    0: {
        day: "Sun",
    },
    1: {
        day: "Mon"
    },
    2: {
        day: "Tue"
    },
    3: {
        day: "Wed"
    },
    4: {
        day: "Thu"
    },
    5: {
        day: "Fri"
    },
    6: {
        day: "Sat"
    },
}

// Index the object with "servName"
// @index, can access "name", "startTime", "endTime"
var ServiceRanges = {}

// Index the object with "contactName"
// @index, can access "title", "phone", "email"
var Contacts = {}

let test = document.getElementById("test")
let form = document.querySelector("form")
let clearButton = document.getElementById("clear-btn")
let submitButton = document.getElementById("submit-btn")

let contactsInputs = document.getElementById("contacts-inputs")
let contactsList = document.getElementById("contacts-list")
let contactsModal = document.getElementById("contacts-modal")
let contactName = document.getElementById("id_contact_name")
let contactTitle = document.getElementById("id_contact_title")
let contactPhone = document.getElementById("id_contact_phone")
let contactEmail = document.getElementById("id_contact_email")
let contactsModalSubmitButton = document.getElementById("contacts-modal-submit-btn")

let opHoursAlert = document.getElementById("op-hours-alert")
let opHoursList = document.getElementById("op-hours-list")
let opHoursModal = document.getElementById("op-hours-modal")
let opIsRange = document.getElementById("id_op_is_range")
let opDay1 = document.getElementById("id_op_day1")
let opDay1Label = document.querySelector("label[for='id_op_day1']")
let opDay2 = document.getElementById("id_op_day2")
let opDay2Container = document.getElementById("day2")
let opDay2Label = document.querySelector("label[for='id_op_day2']")
let opDayRangeAlert = document.getElementById("day-range-errmsg")
let opStartHour = document.getElementById("id_op_start_hour")
let opStartMin = document.getElementById("id_op_start_min") 
let opStartAmPm = document.getElementById("id_op_start_am_pm") 
let opEndHour = document.getElementById("id_op_end_hour")
let opEndMin = document.getElementById("id_op_end_min") 
let opEndAmPm = document.getElementById("id_op_end_am_pm") 
let opHoursModalSubmitButton = document.getElementById("op-hours-modal-submit-btn")

let servHoursList = document.getElementById("serv-hours-list")
let servName = document.getElementById("id_service_name")
let servStartHour = document.getElementById("id_service_start_hour")
let servStartMin = document.getElementById("id_service_start_min")
let servStartAmPm = document.getElementById("id_service_start_am_pm")
let servEndHour = document.getElementById("id_service_end_hour")
let servEndMin = document.getElementById("id_service_end_min")
let servEndAmPm = document.getElementById("id_service_end_am_pm")
let servHoursModalSubmitButton = document.getElementById("serv-hours-modal-submit-btn")

const timeString = (hour, min, amPm) => {
    if(min < 10) {
        min = "0" + min.toString()
    }
    return `${hour}:${min} ${amPm}`
}

const timeRangeString = (startHour, startMin, startAmPm, endHour, endMin, endAmPm) => {
    return `${timeRange(startHour, startMin, startAmPm)} to ${timeRange(endHour, endMin, endAmPm)}`
}

const removeAllChildren = (node) => {
    while(node.firstChild) {
        node.removeChild(node.lastChild)
    }
}

const renderOpHoursList = () => {
    removeAllChildren(opHoursList)
    for(i = 0; i < Object.keys(DayRanges).length; i++) {
        let dayRange = DayRanges[i]
        if(dayRange["startTime"] != null && dayRange["endTime"] != null) {
            let listElem = document.createElement("li")
            listElem.setAttribute("class", "list-group-item")
            listElem.innerHTML = `${dayRange["day"]} - ${dayRange["startTime"]} to ${dayRange["endTime"]}`
            opHoursList.appendChild(listElem)
        }
    }
}

const renderServHoursList = () => {
    removeAllChildren(servHoursList)
    Object.keys(ServiceRanges).forEach(key => {
        let servRange = ServiceRanges[key]
        let listElem = document.createElement("li")
        listElem.setAttribute("class", "list-group-item")
        listElem.innerHTML = `${servRange["name"]} - ${servRange["startTime"]} to ${servRange["endTime"]}`
        servHoursList.appendChild(listElem)
    })
}

const renderContactsList = () => {
    removeAllChildren(contactsList)
    Object.keys(Contacts).forEach(key => {
        let contact = Contacts[key]
        let listElem = document.createElement("li")
        let titleStr = (contact["title"]) ? `- ${contact["title"]}` : ""
        listElem.setAttribute("class", "list-group-item")
        listElem.innerText = `${key} ${titleStr}
        Phone #: ${contact["phone"]}
        Email: ${contact["email"]}`
        contactsList.appendChild(listElem)
    })
}

const dayRangeToggle = (event) => {
    if(opIsRange.checked){
        opDay2Container.classList.remove("d-none")
        opDay1Label.innerHTML = "Day 1"
        opDay2Label.innerHTML = "Day 2"
    } else {
        opDay2Container.classList.add("d-none")
        opDay1Label.innerHTML = "Day"
        opDay2.value = ""
    }
}

const resetContactsForm = () => {
    contactName.value = ""
    contactTitle.value = ""
    contactPhone.value = ""
    contactEmail.value = ""
}

const resetOpHoursForm = () => {
    opHoursAlert.classList.add("d-none")
    opHoursAlert.innerHTML = ""
    opIsRange.checked = false
    opDay1.value = ""
    opDay1Label.innerHTML = "Day"
    opDay2.value = ""
    opDay2Container.classList.add("d-none")
    opStartHour.value = ""
    opStartMin.value = ""
    opStartAmPm.value = ""
    opEndHour.value = ""
    opEndMin.value = ""
    opEndAmPm.value = ""
}

const resetServHoursForm = () => {
    servName.value = ""
    servStartHour.value = ""
    servStartMin.value = ""
    servStartAmPm.value = ""
    servEndHour.value = ""
    servEndMin.value = ""
    servEndAmPm.value = ""
}

const contactsHandler = (event) => {
    // need to validate form
    
    let name = contactName.value
    if(Contacts[name] == null && name != ""){
        console.log("adding")
        Contacts[name] = {}
        Contacts[name]["title"] = contactTitle.value
        Contacts[name]["phone"] = contactPhone.value
        Contacts[name]["email"] = contactEmail.value
    } else {
        // Need alert for duplicates/updates
    }
    renderContactsList()
}


// ADD CLOSED OPTION
const opHoursHandler = (event) => {
    removeAllChildren(opHoursAlert)

    // need to validate form

    var updatesNeeded = false

    opHoursAlert.classList.add("d-none")

    if (opDay1.value >= opDay2.value && opDay2.value != "") {
        opDayRangeAlert.classList.remove("d-none")
    } else {
        opDayRangeAlert.classList.add("d-none")

        if(opDay2.value != ""){
            for(i = opDay1.value; i <= opDay2.value; i++){
                if(DayRanges[i]["startTime"] == null && DayRanges[i]["endTime"] == null){
                    DayRanges[i]["startTime"] = timeString(opStartHour.value, opStartMin.value, opStartAmPm.value)
                    DayRanges[i]["endTime"] = timeString(opEndHour.value, opEndMin.value, opEndAmPm.value)
                } else {
                    opHoursAlert.classList.remove("d-none")
                    let txt = document.createTextNode(`Time for ${DayRanges[i]["day"]} already exists!`)
                    let br = document.createElement("br")
                    opHoursAlert.appendChild(txt)
                    opHoursAlert.appendChild(br)

                    updatesNeeded = true
                }
            }
        } else {
            let index = opDay1.value
            if(DayRanges[index]["startTime"] == null && DayRanges[index]["endTime"] == null) {
                DayRanges[index]["startTime"] = timeString(opStartHour.value, opStartMin.value, opStartAmPm.value)
                DayRanges[index]["endTime"] = timeString(opEndHour.value, opEndMin.value, opEndAmPm.value)
            } else {
                opHoursAlert.classList.remove("d-none")
                let txt = document.createTextNode(`Time for ${DayRanges[opDay1.value]["day"]} already exists!`)
                let br = document.createElement("br")
                opHoursAlert.appendChild(txt)
                opHoursAlert.appendChild(br)    

                updatesNeeded = true
            }
        }
    }
    renderOpHoursList()
    if(!updatesNeeded){
        $("#op-hours-modal").modal("toggle")
    }
}

const servHoursHandler = (event) => {
    let name = servName.value
    if(ServiceRanges[name] == null && name != ""){
        ServiceRanges[name] = {}
        ServiceRanges[name]["name"] = String(name)
        ServiceRanges[name]["startTime"] = timeString(servStartHour.value, servStartMin.value, servStartAmPm.value)
        ServiceRanges[name]["endTime"] = timeString(servEndHour.value, servEndMin.value, servEndAmPm.value)

        // Blue alert: successful add, column with "name"
        // ^^ Don't want to exit out like how opHours is or change opHours?
        
        renderServHoursList()
    } else {
        // Alert
    }
}

const locationHandler = (event) => {
    event.preventDefault()


    // Either bundle meta (contacts, opHours, etc) data into Ajax
    // or maybe make hidden inputs from the 3 data structures with
    // predetermined names? 

    // Data validation

    // Submit form to Django
    form.submit()
}

const init = (event) => {
    $("#contacts-modal").on("hidden.bs.modal", resetContactsForm)
    $("#op-hours-modal").on("hidden.bs.modal", resetOpHoursForm)
    $("#serv-hours-modal").on("hidden.bs.modal", resetServHoursForm)
    clearButton.addEventListener("click", (event) => form.reset())

    opIsRange.addEventListener("change", dayRangeToggle)

    contactsModalSubmitButton.addEventListener("click", contactsHandler)
    opHoursModalSubmitButton.addEventListener("click", opHoursHandler)
    servHoursModalSubmitButton.addEventListener("click", servHoursHandler)
    submitButton.addEventListener("click", locationHandler)
}

document.addEventListener("DOMContentLoaded", init);