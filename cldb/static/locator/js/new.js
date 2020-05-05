// Django does this to mark the id of an element:
//      field           id (HTML)
//  op_start_min       id_op_start_min
//  op_day2            id_op_day2
//
// Or for names: name (HTML) = Django field

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

const validateUrl = (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

/* Ret: true if
    - time1 is earlier than time2
    - time1=time2="00:00AM"
    - time1=time2="12:00AM"
*/
const isValidTimeRange = (time1, time2) => {
    // Closed and 24 hours options
    console.log(`Function: ${time1} - ${time2}`)
    if( (time1 == "00:00 AM" && time2 == "00:00 AM") ||
        (time1 == "12:00 AM" && time2 == "12:00 AM")) 
    {
        return true
    }

    let isValid = true
    const tokens1 = time1.split(" ")
    const hrsMin1 = tokens1[0].split(":")
    const tokens2 = time2.split(" ")
    const hrsMin2 = tokens2[0].split(":")

    //Compare Hours and Meridian
    let meridianOffset1 = tokens1[1] == "AM" ? 0 : 12
    let meridianOffset2 = tokens2[1] == "AM" ? 0 : 12
    let hours1 = parseInt(hrsMin1[0]) + meridianOffset1
    let hours2 = parseInt(hrsMin2[0]) + meridianOffset2

    if(hours1 > hours2)
        isValid = false
    else if(hours1 == hours2) {
        // Compare Minutes
        let min1 = parseInt(hrsMin1[1])
        let min2 = parseInt(hrsMin2[1])
        if(min1 >= min2)
            isValid = false
    }
    console.log(`Decision: ${isValid}`)
    return isValid
}

const renderOpHoursList = () => {
    $("#op-hours-list").empty()
    for(let i in DayRanges) {
        let dayRange = DayRanges[i]
        if(dayRange["startTime"] != null && dayRange["endTime"] != null) {
            let listElem = document.createElement("li")
            $(listElem).addClass("list-group-item border border-secondary mb-1")
            if(dayRange["startTime"] == "00:00 AM" && 
                dayRange["endTime"] == "00:00 AM"
                )
                listElem.innerHTML = `${dayRange["day"]}: CLOSED`
            else if(dayRange["startTime"] == "12:00 AM" && 
                    dayRange["endTime"] == "12:00 AM"
                    )
                    listElem.innerHTML = `${dayRange["day"]}: Open 24 Hours`
            else
                listElem.innerHTML = `${dayRange["day"]} - ${dayRange["startTime"]} to ${dayRange["endTime"]}`

            let deleteOverlay = document.createElement("div")
            $(deleteOverlay).addClass("overlay")
            let deleteText = document.createElement("div")
            deleteText.setAttribute("class", "overlay-text")
            let text = document.createTextNode("Click to delete")
            deleteText.appendChild(text)
            deleteOverlay.appendChild(deleteText)
            deleteOverlay.addEventListener("click", (event) => {
                delete DayRanges[i]["startTime"]
                delete DayRanges[i]["endTime"]
                $(event.target).closest("li.list-group-item").remove()
            })

            listElem.appendChild(deleteOverlay)
            $("#op-hours-list").append(listElem)
        }
    }
}

const renderServHoursList = () => {
    $("#serv-hours-list").empty()
    for(key in ServiceRanges) {
        let servRange = ServiceRanges[key]
        let listElem = document.createElement("li")
        $(listElem).addClass("list-group-item border border-secondary mb-1")
        listElem.innerHTML = `${key} - ${servRange["startTime"]} to ${servRange["endTime"]}`

        let deleteOverlay = document.createElement("div")
        $(deleteOverlay).addClass("overlay")
        let deleteText = document.createElement("div")
        deleteText.setAttribute("class", "overlay-text")
        let text = document.createTextNode("Click to delete")
        deleteText.appendChild(text)
        deleteOverlay.appendChild(deleteText)
        deleteOverlay.addEventListener("click", (event) => {
            delete ServiceRanges[key]
            $(event.target).closest("li.list-group-item").remove()
        })

        listElem.appendChild(deleteOverlay)
        $("#serv-hours-list").append(listElem)
    }
}

const renderContactsList = () => {
    $("#contacts-list").empty()
    for(key in Contacts) {
        let contact = Contacts[key]
        let listElem = document.createElement("li")
        let titleStr = contact["title"] ? `- ${contact["title"]}` : ""
        let phoneStr = contact["phone"] ? `<br>Phone: ${contact["phone"]}` : ""
        let emailStr = contact["email"] ? `<br>Email: ${contact["email"]}` : ""
        $(listElem).addClass("list-group-item border border-secondary mb-1")
        listElem.innerHTML = `${key} ${titleStr}${phoneStr}${emailStr}`

        let deleteOverlay = document.createElement("div")
        $(deleteOverlay).addClass("overlay")
        let deleteText = document.createElement("div")
        deleteText.setAttribute("class", "overlay-text")
        let text = document.createTextNode("Click to delete")
        deleteText.appendChild(text)
        deleteOverlay.appendChild(deleteText)
        deleteOverlay.addEventListener("click", (event) => {
            delete Contacts[key]
            $(event.target).closest("li.list-group-item").remove()
        })

        listElem.appendChild(deleteOverlay)
        $("#contacts-list").append(listElem)
    }
}

const dayRangeToggle = (event) => {
    if($("[name='op_is_range']").prop("checked")){
        $("#day2").removeClass("d-none")
        $("label[for='id_op_day1']").html("Day 1")
        $("label[for='id_op_day2']").html("Day 2")
    } else {
        $("#day2").addClass("d-none")
        $("label[for='id_op_day1']").html("Day")
        $("[name='op_day2']").val("")
    }
}

const contactsHandler = (event) => {
    let formIsValid = true

    let nameInput = $("[name='contact_name']")
    let name = nameInput.val()
    $("[name='contact_email']").val()
    let phone = $("[name='contact_phone']").val()
    let email = $("[name='contact_email']").val()
    if(name == ""){
        nameInput.addClass("is-invalid")
        nameInput.attr("placeholder", "This field is required")
        formIsValid = false
    }
    if($("[name='contact_phone']").val().includes("_")){
        $("[name='contact_phone']").addClass("is-invalid")
        formIsValid = false
    }
    if($("[name='contact_email']").val().includes("_")){
        $("[name='contact_email']").addClass("is-invalid")
        formIsValid = false
    }
    
    if(formIsValid){
        if(Contacts[name] == null){
            Contacts[name] = {}
            Contacts[name]["title"] = $("[name='contact_title']").val()
            Contacts[name]["phone"] = $("[name='contact_phone']").val()
            Contacts[name]["email"] = $("[name='contact_email']").val()
        } else {
            if(confirm(`Record for ${name} already exists! Update the existing contact?`)){
                Contacts[name]["title"] = $("[name='contact_title']").val()
                Contacts[name]["phone"] = $("[name='contact_phone']").val()
                Contacts[name]["email"] = $("[name='contact_email']").val()
            }
        }
        renderContactsList()
        $("#contacts-modal").modal("toggle")
    }
}

const opHoursHandler = (event) => {
    let formIsValid = true

    let day1 = $("[name='op_day1']")
    let day2 = $("[name='op_day2']")
    let startTime = $("[name='op_start_time']")
    let endTime = $("[name='op_end_time']")

    if(day1.val() == "") { 
        day1.addClass("is-invalid")
        formIsValid = false
    } else 
        day1.removeClass("is-invalid")

    if($("[name='op_is_range']").prop("checked") && day2.val() == ""){
        day2.addClass("is-invalid")
        formIsValid = false
    } else 
        day2.removeClass("is-invalid")

    if((day1.val() >= day2.val()) && (day2.val() != "")){
        $("#day-range-errmsg").removeClass("d-none")
        formIsValid = false
    }
    else
        $("#day-range-errmsg").addClass("d-none")

    if(startTime.val() == "" || startTime.val().includes("_")){ 
        startTime.addClass("is-invalid")
        formIsValid = false
    } else 
        startTime.removeClass("is-invalid") 
    if(endTime.val() == "" || endTime.val().includes("_")){ 
        endTime.addClass("is-invalid") 
        formIsValid = false
    } else {
        endTime.removeClass("is-invalid") 
        if(!isValidTimeRange(startTime.val(), endTime.val())) {
            alert("Please enter a proper time range!")
            formIsValid = false
        } else 
            formIsValid = true
    }

    if(formIsValid){
        if(day2.val() != "" && $("[name='op_is_range']").prop("checked")){
            var keysToUpdate = {}

            for(day = day1.val(); day <= day2.val(); day++){
                let range = DayRanges[day]

                if(range["startTime"] == null && range["endTime"] == null){
                    DayRanges[day]["startTime"] = startTime.val()
                    DayRanges[day]["endTime"] = endTime.val()
                } else {
                    keysToUpdate[DayRanges[day]["day"]] = {
                        idx: day,
                        startTime: startTime.val(),
                        endTime: endTime.val(),
                    }
                }
            }

            let days = Object.keys(keysToUpdate).join(", ")
            if(Object.keys(keysToUpdate).length > 0){
                if(confirm(`${days} have existing times. Update?`)){
                    for(key in keysToUpdate){
                        let idx = keysToUpdate[key].idx
                        DayRanges[idx]["startTime"] = keysToUpdate[key].startTime
                        DayRanges[idx]["endTime"] = keysToUpdate[key].endTime
                    }
                }
            }

        } else {
            let day = day1.val()
            let range = DayRanges[day]

            if(range["startTime"] == null && range["endTime"] == null){
                DayRanges[day]["startTime"] = startTime.val()
                DayRanges[day]["endTime"] = endTime.val()
            } else if(confirm(`${DayRanges[day]["day"]} has an existing time. Update?`)){
                DayRanges[day]["startTime"] = startTime.val()
                DayRanges[day]["endTime"] = endTime.val()
            }
        }
        renderOpHoursList()
        $("#op-hours-modal").modal("toggle")
    }
}

const serviceHoursHandler = (event) => {
    let formIsValid = true

    let name = $("[name='service_name']").val()
    let startTime = $("[name='service_start_time']")
    let endTime = $("[name='service_end_time']")

    if(name == ""){
        $("[name='service_name']").addClass("is-invalid")
        formIsValid = false
    } else 
        $("[name='service_name']").removeClass("is-invalid")
    if(startTime.val() == "" || startTime.val().includes("_")){ 
        startTime.addClass("is-invalid")
        formIsValid = false
    } else 
        startTime.removeClass("is-invalid") 
    if(endTime.val() == "" || endTime.val().includes("_")){ 
        endTime.addClass("is-invalid") 
        formIsValid = false
    } else {
        endTime.removeClass("is-invalid") 
        if(!isValidTimeRange(startTime.val(), endTime.val())) {
            alert("Please enter a proper time range!")
            formIsValid = false
        } else 
            formIsValid = true
    }

    if(formIsValid){
        if(ServiceRanges[name] == null){
            ServiceRanges[name] = {}
            ServiceRanges[name]["startTime"] = startTime.val()
            ServiceRanges[name]["endTime"] = endTime.val()
        } else {
            if(confirm(`Time for ${name} exists. Update?`)){
                ServiceRanges[name]["startTime"] = startTime.val()
                ServiceRanges[name]["endTime"] = endTime.val()
            }
        }
        renderServHoursList()
        $("#serv-hours-modal").modal("toggle")
    }
}

const exportToJSON = () => {
    var json = {
        location: {
            location_category: $("[name='location_category']").val(),
            name: $("[name='location_name']").val(),
            branch_name: $("[name='location_branch_name']").val(),
            street_line_1: $("[name='street_line_1']").val(),
            street_line_2: $("[name='street_line_2']").val(),
            city: $("[name='city']").val(),
            state: $("[name='state']").val(),
            zipcode: $("[name='zipcode']").val(),
            phone: $("[name='phone']").val(),
            is_phone_callable: $("[name='is_phone_callable']").val(),
            fax: $("[name='fax']").val(),
            website: $("[name='website']").val(),
            comments: $("[name='comments']").val(),
            last_verified: "January 1, 1900",	
            service_list: $("[name='service_list']").val(),
            ccf_category_list: $("[name='ccf_category_list']").val(),
            auth_method_list: $("[name='auth_method_list']").val(),
        },
        contacts: [],
        op_hours: [],
        service_hours: [],
    }
    var nums = new Date().toLocaleDateString().split("/")
    var year = nums.splice(-1)[0]
    nums.splice(0, 0, year)
    json.location.last_verified = nums.join("-")

    for(key in Contacts){
        json.contacts.push({
            "name": key,
            "title": Contacts[key]["title"],
            "phone": Contacts[key]["phone"],
            "email": Contacts[key]["email"],
        })
    }
    for(key in DayRanges){
        if(DayRanges[key]["startTime"] != null && DayRanges[key]["endTime"] != null) {
            // <key> is the index of the day, which is also used in the DB
            json.op_hours.push({
                "day": key,
                "start_time": DayRanges[key]["startTime"],
                "end_time": DayRanges[key]["endTime"],
            })
        }
    }
    for(key in ServiceRanges){
        json.service_hours.push({
            "name": key,
            "start_time": ServiceRanges[key]["startTime"],
            "end_time": ServiceRanges[key]["endTime"],
        })
    }

    return json
}

const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const sendData = (event) => {
    event.preventDefault()

    let alertUser = false
    $("input, textarea, select").filter("[required]:visible").each((idx, elem) => {
        if(elem.value == "" || elem.value.includes("_")) {
            elem.classList.add("is-invalid")
            elem.setAttribute("placeholder", "This field is required.")
            alertUser = true
        }
    })

    let url = $("[name='website']").val()
    let areInputsValid = true
    $("input, textarea, select").each((idk, elem) => {
        if(elem.classList.contains("is-invalid")){
            areInputsValid = false
            console.log(`Element ${elem}`)
        }
    })

    if(alertUser || !areInputsValid) {
        console.log(`Alert ${alertUser}`)
        console.log(`Input ${areInputsValid}`)
        alert("Please fix the invalid fields!")
    } else {
        var jsonData = exportToJSON()
        var csrftoken = getCookie("csrftoken")
        console.log(`SENDING: ${JSON.stringify(jsonData)}`)

        $.ajax({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            data: JSON.stringify(jsonData),
            success: (data) => {
                if(data != undefined){
                    let url = window.location.href
                    // Get url minus the '/'
                    url = url.substr(0, url.lastIndexOf("/"))
                    // Get url minus the 'new', append pk for API
                    url = url.substr(0, url.lastIndexOf("/")+1) + data["id"]

                    window.location.href = url
                }
            },
            error: (xhr, errmsg, err) => {
                console.log(xhr.status + ": " + xhr.responseText)
            },
        })
    }
}

const isClosedHandler = (event) => {
    if(event.target.checked) {
        $("[name='op_start_time']").inputmask("remove")
        $("[name='op_end_time']").inputmask("remove")
        $("input#id_op_start_time, input#id_op_end_time")
            .val("00:00 AM")
        $("input#id_op_start_time, input#id_op_end_time")
            .attr("readonly", true)
        $("input#is24_7").attr("disabled", true)
    } else {
        $("input#id_op_start_time, input#id_op_end_time")
            .attr("readonly", false)
        $("input#is24_7").attr("disabled", false)
        $("input#id_op_start_time, input#id_op_end_time")
        .val("")
        $("[name='op_start_time']").inputmask({
            alias: "datetime",
            placeholder: "__:__ AM",
            inputFormat: "hh:MM TT",
            hourFormat: 12,
        })
        $("[name='op_end_time']").inputmask({
            alias: "datetime",
            placeholder: "__:__ AM",
            inputFormat: "hh:MM TT",
            hourFormat: 12,
        })
    }
}

const is24HoursHandler = (event) => {
    if(event.target.checked) {
        $("input#id_op_start_time, input#id_op_end_time")
        .val("12:00 AM")
        $("input#id_op_start_time, input#id_op_end_time")
            .attr("readonly", true)
        $("input#isClosed").attr("disabled", true)
    } else {
        $("input#id_op_start_time, input#id_op_end_time")
        .val("")
        $("input#id_op_start_time, input#id_op_end_time")
            .attr("readonly", false)
        $("input#isClosed").attr("disabled", false)
    }
}

var init = (event) => {
    // Removes blur from drop-down menu rendering
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;
    $(".multi-select").selectpicker();

    $("#contacts-modal").on("hidden.bs.modal", () => {
        $("[name='contact_name']").removeClass("is-invalid")
        $("[name='contact_name']").attr("placeholder", "")
        $("#contact-fields :input").val("")
        $("[name='contact_phone']").removeClass("is-invalid")
        $("[name='contact_email']").removeClass("is-invalid")
    })
    $("#op-hours-modal").on("hidden.bs.modal", () => {
        $("#op-hours-fields :input, #op-hours-fields select").val("")
        $("#op-hours-fields input[type='checkbox']").prop("checked", false)
        $("#day2").addClass("d-none")
        $("input#id_op_start_time, input#id_op_end_time")
            .attr("readonly", false)
        $("input#is24_7").attr("disabled", false)
        $("input#isClosed").attr("disabled", false)
    })
    $("#serv-hours-modal").on("hidden.bs.modal", () => {
        $("#service-hours-fields :input, #service-hours-fields select").val("")
    })

    $("[name='website']").on("change", (event) => {
        if(!validateUrl(event.target.value)){
            $(event.target).addClass("is-invalid")
            $("#div_id_website").addClass("mb-0")
            $("#urlErrMsg").removeClass("d-none")
        } else {
            $(event.target).removeClass("is-invalid")
            $("#div_id_website").removeClass("mb-0")
            $("#urlErrMsg").addClass("d-none")
        }
    })

    $("input, textarea, select").filter("[required]:visible")
        .blur((event) => {
            if(event.target.value == "" || event.target.value.includes("_")) {
                event.target.classList.add("is-invalid")
                if(event.target.value == ""){
                    event.target.setAttribute("placeholder", "This field is required.")
                }
            } else {
                event.target.classList.remove("is-invalid")
                event.target.setAttribute("placeholder", "")
            }
        })
    
    $("[name='zipcode']").inputmask({"mask": "99999"})

    // Mask allows for phone extension to be added (min_len=2, max_len=6)
    $("[name='phone'], [name='contact_phone']").inputmask({"mask": "(999) 999-9999[ ext. 99[9[9[9[9]]]]]"})
    $("[name='fax']").inputmask({"mask": "(999) 999-9999"})
    console.log($("[name='contact_email']"))
    $("[name='contact_email']").inputmask({alias: "email"})
    $("[name='op_start_time']").inputmask({
        alias: "datetime",
        placeholder: "__:__ AM",
        inputFormat: "hh:MM TT",
        hourFormat: 12,
    })
    $("[name='op_end_time']").inputmask({
        alias: "datetime",
        placeholder: "__:__ AM",
        inputFormat: "hh:MM TT",
        hourFormat: 12,
    })
    $("[name='service_start_time']").inputmask({
        alias: "datetime",
        placeholder: "__:__ AM",
        inputFormat: "hh:MM TT",
        hourFormat: 12,
    })
    $("[name='service_end_time']").inputmask({
        alias: "datetime",
        placeholder: "__:__ AM",
        inputFormat: "hh:MM TT",
        hourFormat: 12,
    })

    $("#id_op_is_range").on("change", dayRangeToggle)
    $("#isClosed").on("change", isClosedHandler)
    $("#is24_7").on("change", is24HoursHandler)

    $("#contacts-submit-btn").on("click", contactsHandler)
    $("#op-hours-submit-btn").on("click", opHoursHandler)
    $("#service-hours-submit-btn").on("click", serviceHoursHandler)
    $("#submit-btn").on("click", sendData)
}

$(document).ready(init)