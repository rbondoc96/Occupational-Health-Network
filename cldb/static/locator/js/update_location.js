var Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var getCookie = (name) => {
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

var renderList = (event, field) => {
    // Call API with locId parameter to get all data by location to render
    // All info will be submitted while IN the modal.
    let csrftoken = getCookie("csrftoken")
    let id = String($("#locationID").html())
    let api = `${window.location.origin}/locator/api/location/${id}/extras/?field=${field}`

    $.ajax({
        method: "GET",
        url: api,
        headers: {
            "Content-Type": "application/json",
        },
        success: (data) => {
            console.log(data)
            if(field == "contacts") {
                $("#contact-list").empty()
                for(let i = 0; i < Object.keys(data).length; i++) {
                    let element = data[i] 
                    let li = document.createElement("li")
                    let text = document.createTextNode(element["name"] + " - " + element["title"])
                    li.setAttribute("class", "list-element")
                    li.appendChild(text)
                    $("#contact-list").append(li)
                    console.log(li)
                }
            }
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ": " + xhr.responseText)
        },
    })
}

var exportToJSON = () => {
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

var updateLocation = event => {
    let csrftoken = getCookie("csrftoken")
    let id = String($("#locationID").html())
    let api = window.location.origin + "/locator/api/location/" + id + "/"

    let json = exportToJSON()

    let error = false;
    var receivedData = null;

    $.ajax({
        url: api,
        method: "PUT",
        data: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        success: (data) => {
            $("#autosaveSuccess").removeClass("d-none")
            console.log(`Location updated successfully.`)
            receivedData = data
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ": " + xhr.responseText)
            console.log(`ERROR. Could not update location`)
            error = true;
        },
    })

    return {
        error: error,
        data: receivedData,
    }
}

var contactsUpdateDropdown = event => {
    let id = event.target.value
    let csrftoken = getCookie("csrftoken")
    let api = window.location.origin + "/locator/api/contacts/" + id + "/"

    if(id == 0){
        $("#contact-buttons").hide()
        $("#contacts-update-form").hide()
    }
    else if (id != -1) {        
        $.ajax({
            method: "GET",
            url: api,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            success: (data) => {
                $("[name='edit-contact-name']").val(data["name"])
                $("[name='edit-contact-title']").val(data["title"])
                $("[name='edit-contact-phone']").val(data["phone"])
                $("[name='edit-contact-email']").val(data["email"])
                $("#contacts-update-form").show()
                $("#contact-buttons").show()
            },
            error: (xhr, errmsg, err) => {
                console.log(xhr.status + ": " + xhr.responseText)
            },
        })
    } else {

    }
}

var updateContact = event => {
    let csrftoken = getCookie("csrftoken")
    let id = $("#masterContactsList").val()
    let api = window.location.origin + "/locator/api/contacts/" + id + "/"

    var json = {
        "name": $("[name='edit-contact-name']").val(),
        "title": $("[name='edit-contact-title']").val(),
        "phone": $("[name='edit-contact-phone']").val(),
        "email": $("[name='edit-contact-email']").val(),
    }

    $.ajax({
        method: "PUT",
        url: api,
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        data: JSON.stringify(json),
        success: (data) => {
            $("#contacts-update-form .updated-alert").show()
            $("#contacts-update-form .updated-alert").fadeOut(2500)
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ": " + xhr.responseText)
        },
    })
}

var createContact = event => {
    let name = $("[name='add-contact-name']").val()
    if(name == "" || name == null) {
        $("[name='add-contact-name']").addClass("form-invalid")
        $("[name='add-contact-name']").attr("placeholder", "This field is required.")
    } else {
        let csrftoken = getCookie("csrftoken")
        let location = String($("#locationID").html())
        let api = window.location.origin + "/locator/api/location/" + location + "/contacts/add/"
    
        var json = {
            "name": $("[name='add-contact-name']").val(),
            "title": $("[name='add-contact-title']").val(),
            "phone": $("[name='add-contact-phone']").val(),
            "email": $("[name='add-contact-email']").val(),
        }
    
        $.ajax({
            method: "POST", 
            url: api,
            data: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            success: (data) => {
                $("#contacts-create-form .created-alert").show()
                $("#contacts-create-form .created-alert").fadeOut(2500)
                let option = document.createElement("option")
                let text = document.createTextNode(data["name"])
                option.setAttribute("value", data["id"])
                option.appendChild(text)
                $("#masterContactsList").append(option)
    
                $("[name='add-contact-name']").val("")
                $("[name='add-contact-title']").val("")
                $("[name='add-contact-phone']").val("")
                $("[name='add-contact-email']").val("")
            },
            error: (xhr, errmsg, err) => {
                console.log(xhr.status + ": " + xhr.responseText)
            },
        })
    }
}

var deleteContact = event => {
    if(confirm("Warning, this cannot be undone. Delete contact?")){   
        let csrftoken = getCookie("csrftoken")
        let id = $("#masterContactsList").val()
        let api = window.location.origin + "/locator/api/contacts/delete/" + id + "/"

        $.ajax({
            method: "GET",
            url: api,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            success: (data) => {
                $("#masterContactsList").val("")
                $("#contacts-update-form .form-item input").val("")
                $("#contacts-update-form").hide()
                $("#contact-buttons").hide()
                $(`#masterContactsList option[value=${id}]`).remove()
                $("#deleted-alert").show()
                $("#deleted-alert").fadeOut(2500)
            },
            error: (xhr, errmsg, err) => {
                console.log(xhr.status + ": " + xhr.responseText)
            },
        })
    }
}

var init = () => {
    // Removes blur from drop-down menu rendering
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false
    // Makes menu setting as drop down
    $.fn.selectpicker.Constructor.DEFAULTS.dropupAuto = false
    // Makes default multiple select menu rendering at 4 rows
    $.fn.selectpicker.Constructor.DEFAULTS.size = 4


    $("#contactsModal").on("hidden.bs.modal", event => {
        $("[name='add-contact-name']").removeClass("form-invalid")
        $("[name='add-contact-name']").attr("placeholder", "")
        $("#masterContactsList").val("")
        $("#contacts-update-form .form-item input").val("")
        $("#contacts-update-form").hide()
        $("#contact-buttons").hide()
    })

    $("[name='zipcode']").inputmask({"mask": "99999"})
    $("[name='phone'], [name='add-contact-phone']").inputmask({"mask": "(999) 999-9999[ ext. 99[9[9[9[9]]]]]"})
    $("[name='fax']").inputmask({"mask": "(999) 999-9999"})
    
    $("[name='add-contact-email']").inputmask({alias: "email"})


    $("[name='website']").attr("rows", "4")
    $("select[multiple]").selectpicker()

    $("#contacts-update-form").hide()
    $("#contact-buttons").hide()
    $("#deleted-alert").hide()
    $("#contacts-update-form .updated-alert").hide()
    $("#contacts-create-form .created-alert").hide()
    $("#masterContactsList").on("change", contactsUpdateDropdown)
    $("#addContact").on("click", createContact)
    $("#updateContact").on("click", updateContact)
    $("#deleteContact").on("click", deleteContact)
    $("#contactsClose").on("click", event => {
        renderList(event, "contacts")
    })

    $("#")
}

$(document).ready(init)