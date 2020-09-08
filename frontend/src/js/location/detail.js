import "../components/cards/contact-card"
import "../components/cards/service-hour-card"

import "../../scss/location/detail.scss"
import {timestrConvert, timeRangeToString} from "../utils"

import CallableIcon from "../../assets/icon-valid.svg"
import UncallableIcon from "../../assets/icon-invalid.svg"
import CalendarIcon from "../../assets/calendar.svg"
import PhoneIcon from "../../assets/phone-icon.svg"
import MailIcon from "../../assets/mail-icon.svg"

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

const setButtonLinks = function(wrapper, slug) {
    let updateLink = wrapper.querySelector(".update-link")
    let reviewLink = wrapper.querySelector(".review-link")

    updateLink.setAttribute("href", `/locations/update/${slug}`)

    reviewLink.addEventListener("click", event => {
        window.open(`/locations/${slug}/review`, "_blank", `
            location=yes,
            height=800,
            width=700, 
            top=${(screen.height - 800) / 4}
            left=${(screen.width - 700) / 2}
        `)
    })
}

const setReviewsText = function(wrapper) {
    const slug = window.location.pathname.split("/")[2]
    fetch(`http://127.0.0.1:8000/api/review_stats/?location=${slug}`)
    .then(response => response.json())
    .then(json => {
        let starsFill = wrapper.querySelector(".stars-inner")
        let average = json["average_rating"]
        let link = `<a href="/locations/reviews/${slug}" target="_blank">out of ${json["total_reviews"]} reviews</a>`

        // There are 5 stars to fill
        let starsPercent = (average / 5.0) * 100
        starsPercent = `${Math.round(starsPercent/10) * 10}%`

        starsFill.style.width = starsPercent
        wrapper.insertAdjacentHTML("beforeend", link)
    })
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
                days = abbrevList.join(", ")
            } else {
                days = ""
            }

            let markup = `
                <li class="col-md-6">
                    <service-hour-card>
                        <span slot="service">${item.name}</span>
                        <span slot="time-range">${timeRangeToString(timestrConvert(item.start_time), timestrConvert(item.end_time))}</span>
                        <span slot="days">${days}</span>
                    </service-hour-card>
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
                <li class="col-md-6">
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

        let comments = document.createElement("p")
        comments.setAttribute("class", "comments")
        comments.textContent = value

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

        document.title = (location.branch_name != "") ? 
        `${location.name} - ${location.branch_name}` :
        location.name

        setText(document.getElementById("center-name"), location.name)
        setText(document.getElementById("branch-name"), location.branch_name)
        setText(document.getElementById("location-category"), location.location_category.name)
        setObjectListText(document.getElementById("auth-method-list"), location.auth_method_list)
        setObjectListText(document.getElementById("ccf-category-list"), location.ccf_category_list)
    
        setButtonLinks(document.querySelector(".buttons"), location.slug)
        setReviewsText(document.querySelector(".clinic-reviews"))
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
    
    const deleteButton = document.getElementById("delete-link")
    if(deleteButton) {
        deleteButton.setAttribute("href", `${window.location.pathname}delete/`)
    }
})