import "./components/cards/contact-card"

import "../scss/location.scss"
import {timestrConvert, timeRangeToString} from "./utils"

import CallableIcon from "../assets/icon-valid.svg"
import UncallableIcon from "../assets/icon-invalid.svg"
import CalendarIcon from "../assets/calendar.svg"
import PhoneIcon from "../assets/phone-icon.svg"
import MailIcon from "../assets/mail-icon.svg"

var script = document.createElement('script')
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso&callback=initMap&libraries=places'
script.defer = true
script.async = true

var map

window.initMap = function() {
    var options = {
        zoom: 12,
        center: {lat: 32.7785, lng: -117.1306}
    }
    map = new google.maps.Map(document.getElementById('map'), options);
}
document.head.appendChild(script);

const addMarker = function(pos) {
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
    })
}

const setText = function(elem, text, list=false) {
    var textNode = document.createTextNode(text)
    elem.appendChild(textNode)
}

const setObjectListText = function(elem, objList) {
    if(objList.length > 0) {
        var list = []
        for(let obj of objList) {
            list.push(obj.name)
        }

        var text = document.createTextNode(list.join(", "))
        elem.appendChild(text)
    }
}

const setReviewsText = function(elem, reviews) {
    let sum = 0
    let length = Object.keys(reviews).length
    if(length > 0) {
        for(let rev of reviews) 
            sum += rev.rating

        let avg = (sum / length).toFixed(2)
        let slug = window.location.pathname.split("/")[2]

        const markup = `
            <span>Average rating: </span>
            <span
            class="${avg > 4 ? 'good-reviews' : avg > 2 ? 'okay-reviews' : 'bad-reviews'}"
            >${avg}</span>
            <span> out of <a href="/locations/reviews/${slug}">${length}</a> reviews</span>
        `       
        elem.innerHTML = markup
    } else {
        const markup = `<span>No reviews yet!</span>`
        elem.innerHTML = markup
    }
}

const sortServicesByCategory = function(objList) {
    var sortedDict = {}

    for(let obj of objList) {
        let category = obj.service_category.name
        
        if(sortedDict[category] == undefined) 
            sortedDict[category] = [obj.name]
        else 
            sortedDict[category].push(obj.name)
    }

    return sortedDict
}

const setServicesText = function(elem, objList) {
    if(objList.length > 0) {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Services Provided"))

        elem.appendChild(sectionHeader)

        let sortedDict = sortServicesByCategory(objList)

        let subSection = document.createElement("div")
        subSection.setAttribute("class", "content__main__subsection row")
        for(let item of Object.keys(sortedDict)) {
            let listBlock = document.createElement("div")
            listBlock.setAttribute("class", "col-md-4")
            let subHeader = document.createElement("h3")
            subHeader.setAttribute("class", "content__main__subheader")
            subHeader.appendChild(document.createTextNode(item))
            
            let catList =  document.createElement("ul")
            catList.setAttribute("name", item)
            catList.setAttribute("class", "content__main__list")
            for(let service of sortedDict[item]) {
                let listItem = document.createElement("li")
                listItem.setAttribute("class", "content__main__list-item")
                listItem.append(document.createTextNode(service))
                catList.append(listItem)
            }
            
            listBlock.append(subHeader)
            listBlock.append(catList)
            subSection.appendChild(listBlock)
        }
        elem.appendChild(subSection)
    }
}

const setTimeRangeText = function(elem, range1, range2) {
    let rangeText = timeRangeToString(
        timestrConvert(range1), 
        timestrConvert(range2)
    )
    elem.appendChild(document.createTextNode(rangeText))
}

const setServiceHoursList = function(elem, objList) {
    if(objList.length > 0) {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Service Hours"))

        elem.appendChild(sectionHeader)

        let list = document.createElement("ul")
        list.setAttribute("class", "content__main__list row")
        for(let item of objList) {
            let days

            if(item.days[0] != null || item.days.length > 0) {
                let abbrevList = []
                for(let day of item.days) {
                    abbrevList.push(day.abbreviation)
                }
    
                days = `
                    <div class="service-hour__days">
                        <img src="${CalendarIcon}" class="service-hour__days-label" title="Days Offered">
                        <span>${abbrevList.join(", ")}</span>
                    </div>
                `
            } else {
                days = ""
            }

            let markup = `
                <li class="content__main__list-card col-md-4 mb-4">
                    <strong class="service-hour__service">
                        ${item.name}: 
                    </strong>
                    <span class="service-hour__time">
                        ${timeRangeToString(timestrConvert(item.start_time), timestrConvert(item.end_time))}
                    </span>
                    ${days}
                </li>
            `

            list.innerHTML += markup
        }
        elem.appendChild(list)
    }
}

const setContactsList = function(elem, objList) {
    if(objList.length > 0) {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Contacts"))

        elem.appendChild(sectionHeader)

        let subSection = document.createElement("ul")
        subSection.setAttribute("class", "content__main__list row")
        for(let item of objList) {
            let markup = `
                <li class="content__main__list-card col-md-6 mb-4">
                    <contact-card>
                        <span slot="name">${item.name}</span>
                        ${(item.title !== "" && item.title != null) ? 
                        `
                        <span slot="title"> - ${item.title}</span>
                        `:""
                        }
                        ${(item.phone != "" && item.phone != null) ? 
                        `
                        <span slot="phone">${item.phone}</span>
                        `:""
                        }
                        ${(item.email != "" && item.email != null) ?
                            `
                            <span slot="email">${item.email}</span>
                            `:""
                        }                        
                    </contact-card>
                </li>
            `
            subSection.innerHTML += markup
        }
        elem.append(subSection)
    }
}

const setComments = function(elem, value) {
    if(value != null && value != "") {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Comments"))

        elem.appendChild(sectionHeader)

        let comments = document.createElement("textarea")
        comments.setAttribute("class", "comments")
        comments.value = value

        elem.appendChild(comments)
    }
}

const setAddress = function(elem, obj) {
    if(obj != null) {
        let markup = `
            <div class="address">
                <div class="address__line1">
                    ${obj.street1}
                </div>
                ${(obj.street2 != "" && obj.street2 != null) ? 
                    `
                        <div class="address__line2">
                            ${obj.street2}
                        </div>
                    `:""
                }
                <div class="address__line3">
                    <span class="address__city">${obj.city}</span>
                    <span class="address__state">${obj.state}</span>
                    <span class="address__zipcode">${obj.zipcode}</span>
                </div>
            </div>
        `
        elem.innerHTML += markup
    }
}

const setBusinessHoursList = function(elem, objList) {
    console.log(objList)
    if(objList.length > 0) {

        let list = document.createElement("ul")
        list.setAttribute("class", "business-hour__list")
        for(let obj of objList) {
            let markup = `
                <li class="business-hour__entry">
                    <strong class="business-hour__day">${obj.day.name}: </strong>
                    <span class="business-hour__time">${timeRangeToString(
                        timestrConvert(obj.start_time), 
                        timestrConvert(obj.end_time)
                    )}</span>
                </li>
            `
            // let entry = document.createElement("li")
            // entry.setAttribute("class", "business-hour__entry")

            // let label = document.createElement("strong")
            // label.setAttribute("class", "business-hour__day")
            // label.appendChild(document.createTextNode(obj.day.name + ": "))

            // let timeRange = document.createElement("span")
            // timeRange.setAttribute("class", "business-hour__time")
            // setTimeRangeText(timeRange, obj.start_time, obj.end_time)

            // entry.appendChild(label)
            // entry.appendChild(timeRange)
            list.innerHTML += markup
        }
        elem.appendChild(list)
    }
}

const getLocationContext = async function() {
    var apiUrl = window.origin + "/api" + window.location.pathname

    var location = await fetch(apiUrl, {
        method: "GET",
    }).then(response => {
        return response.json()
    })

    if(location != null) {
        console.log(location)

        document.title = (location.branch_name != "") ? 
        `${location.name} - ${location.branch_name}` :
        location.name

        setText(document.getElementById("center-name"), location.name)
        setText(document.getElementById("branch-name"), location.branch_name)
        setText(document.getElementById("location-category"), location.location_category.name)
        setObjectListText(document.getElementById("auth-method-list"), location.auth_method_list)
        setObjectListText(document.getElementById("ccf-category-list"), location.ccf_category_list)

        setReviewsText(document.querySelector(".clinic-reviews"), location.reviews)
        setServicesText(document.querySelector(".services-section"), location.service_list)
        setServiceHoursList(document.querySelector(".service-hours-section"), location.service_hours)
        setContactsList(document.querySelector(".contacts-section"), location.contacts)
        setComments(document.querySelector(".comments-section"), location.comments)

        setAddress(document.querySelector(".address-section"), {
            street1: location.street_line_1,
            street2: location.street_line_2,
            city: location.city,
            state: location.state,
            zipcode: location.zipcode,
        })

        let directionsLink = document.querySelector(".content__directions-link")
        directionsLink.setAttribute("href", `https://www.google.com/maps/dir/Current+Location/${location.street_line_1}+${location.street_line_2}+${location.city}+${location.state}+${location.zipcode}`)

        let phone = document.querySelector(".phone")
        phone.textContent = location.phone
        
        let phoneIcon = document.createElement("img")
        phoneIcon.setAttribute("class", "is-phone-callable")
        if(location.is_phone_callable == true) {
            phoneIcon.setAttribute("src", CallableIcon)
            phoneIcon.setAttribute("alt", "A human will answer this phone")
            phoneIcon.setAttribute("title", "A human will answer this phone")
        } else {
            phoneIcon.setAttribute("src", UncallableIcon)
            phoneIcon.setAttribute("alt", "Unlikely/not likely that a human will answer this phone")
            phoneIcon.setAttribute("title", "Unlikely/not likely that a human will answer this phone")
        }

        phone.appendChild(phoneIcon)
        document.querySelector(".fax").textContent = location.fax
        document.querySelector(".website a").setAttribute("href", location.website)

        setBusinessHoursList(document.querySelector(".business-hours-section"), location.op_hours)
        
        document.getElementById("date-created").textContent = location.date_created
        document.getElementById("last-updated").textContent = location.last_updated

        const address = document.querySelector(".address").textContent
        var request = {
            query: address,
            fields: ['geometry'],
        }
        
        var service = new google.maps.places.PlacesService(map);   
        service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                addMarker(results[i].geometry.location)
            }
            map.setCenter(results[0].geometry.location);
            }
        })
    } else {
        // Failure to 404 - redirect?
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getLocationContext()

    let box = document.querySelector(".sliding-box")
    box.style.display = "none"

    const employerToggle = document.getElementById("employer-info--toggle")
    employerToggle.addEventListener("click", function(event) {
        let box = document.querySelector(".sliding-box")
        if(box.style.display == "none") 
            box.style.display = "block"
        else
            box.style.display = "none"
    })
})