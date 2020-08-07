import "../scss/location.scss"
import AjaxApiHandler from "./ajax-api-handler"
import {timestrConvert} from "./utils"

/* START Google Maps API */
var script = document.createElement('script')
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso&callback=initMap&libraries=places'
script.defer = true
script.async = true

window.initMap = function() {
    var options = {
        zoom: 12,
        center: {lat: 32.7785, lng: -117.1306}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    const addMarker = (pos) => {
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
        })
    }
}
document.head.appendChild(script);
/* END Google Maps API */

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

const getReviewStats = function(reviews) {
    var likes = 0
    var dislikes = 0
    var length = Object.keys(reviews).length
    if(length > 0) {
        for(let rev of reviews) {
            if(rev.like == true)
                likes++
            else
                dislikes++
        }
    }
    return {
        likes: likes,
        dislikes: dislikes,
        total: Object.keys(reviews).length
    }
}

const setReviewsText = function(elem, reviews) {
    var reviewStats = getReviewStats(reviews)

    var percentPosReviews = (reviewStats.likes * 100 / reviewStats.total).toFixed(2)

    var formattedText = document.createElement("span")
    var label = ` had positive reviews out of ${reviewStats.total}`
    var link = document.createElement("a")
    var slug = window.location.pathname.split("/")[2]
    link.setAttribute("href", `/locations/reviews/${slug}`)

    link.appendChild(document.createTextNode(`${percentPosReviews}%`))
    formattedText.appendChild(link)

    if(percentPosReviews >= 75) {
        formattedText.setAttribute("class", "good-reviews")
    } else if (percentPosReviews >= 40) {
        formattedText.setAttribute("class", "okay-reviews")
    } else {
        formattedText.setAttribute("class", "bad-reviews")
    }
    elem.appendChild(formattedText)
    elem.appendChild(document.createTextNode(label))
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
        subSection.setAttribute("class", "content__main__subsection")
        for(let item of Object.keys(sortedDict)) {
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

            subSection.appendChild(subHeader)
            subSection.appendChild(catList)
        }
        elem.appendChild(subSection)
    }
}

const setTimeRangeText = function(elem, range1, range2) {
    let rangeText

    range1 = timestrConvert(range1)
    range2 = timestrConvert(range2)

    if(range1 == "00:00:00" && range2 == "00:00:00")
        rangeText = "CLOSED"
    else if(range1 == "12:00:00" && range2 == "12:00:00") 
        rangeText = "Open 24 Hours"
    else {
        rangeText = `${range1} to ${range2}`
    }
    elem.appendChild(document.createTextNode(rangeText))
}

const setServiceHoursList = function(elem, objList) {
    if(objList.length > 0) {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Service Hours"))

        elem.appendChild(sectionHeader)

        let subSection = document.createElement("ul")
        subSection.setAttribute("class", "content__main__list")
        for(let item of objList) {
            let card = document.createElement("li")
            card.setAttribute("class", "content__main__list-card")
            
            let name = document.createElement("span")
            name.setAttribute("class", "service-hour__service")
            name.appendChild(document.createTextNode(item.name + ":"))

            let timeRange = document.createElement("span")
            timeRange.setAttribute("class", "service-hour__time")
            setTimeRangeText(timeRange, item.start_time, item.end_time)

            card.appendChild(name)
            card.appendChild(timeRange)
            
            if(item.days[0] != null || item.days.length > 0) {
                let days = document.createElement("div")
                days.setAttribute("class", "service-hour__days")
                let daysLabel = document.createElement("span")
                daysLabel.appendChild(document.createTextNode("Days Offered:"))

                let abbrevList = []
                for(let day of item.days) {
                    abbrevList.push(day.abbreviation)
                }

                let daysList = document.createElement("span")
                daysList.appendChild(document.createTextNode(abbrevList.join(", ")))

                days.append(daysLabel)
                days.append(daysList)
                card.append(days)
            }
            subSection.append(card)
        }
        elem.appendChild(subSection)
    }
}

const setContactsList = function(elem, objList) {
    if(objList.length > 0) {
        let sectionHeader = document.createElement("h2")
        sectionHeader.setAttribute("class", "content__main__header")
        sectionHeader.appendChild(document.createTextNode("Contacts"))

        elem.appendChild(sectionHeader)

        let subSection = document.createElement("ul")
        subSection.setAttribute("class", "content__main__list")
        for(let item of objList) {
            let card = document.createElement("li")
            card.setAttribute("class", "content__main__list-card")
            
            let name = document.createElement("span")
            name.setAttribute("class", "contact__name")
            name.appendChild(document.createTextNode(item.name))

            card.append(name)

            if(item.title != "" && item.title != null) {
                let title = document.createElement("span")
                title.setAttribute("class", "contact__title")
                title.appendChild(document.createTextNode("- " + item.title))

                card.append(title)
            }

            if(item.phone != "" && item.phone != null) {
                let block = document.createElement("div")
                block.setAttribute("class", "contact__phone__section")

                let label = document.createElement("span")
                label.appendChild(document.createTextNode("Phone:"))

                let phone = document.createElement("span")
                phone.setAttribute("class", "contact__phone")
                phone.appendChild(document.createTextNode(item.phone))

                block.append(label)
                block.append(phone)

                card.append(block)
            }
            if(item.email != "" && item.email != null) {
                let block = document.createElement("div")
                block.setAttribute("class", "contact__email__section")

                let label = document.createElement("span")
                label.appendChild(document.createTextNode("Email:"))

                let email = document.createElement("span")
                email.setAttribute("class", "contact__email")
                email.appendChild(document.createTextNode(item.email))

                block.append(label)
                block.append(email)

                card.append(block)
            }
            subSection.append(card)
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
    console.log(obj)
    if(obj != null) {
        let line1 = document.createElement("div")
        line1.appendChild(
            document.createTextNode(obj.street1)
        )
        line1.setAttribute("class", "address__line1")
        elem.appendChild(line1)

        if(obj.street2 != "" && obj.street2 != null) {
            let line2 = document.createElement("div")
            line2.setAttribute("class", "address__line2")
            line2.appendChild(
                document.createTextNode(obj.street2)
            )

            elem.appendChild(line2)
        }

        let line3 = document.createElement("div")
        line3.appendChild(
            document.createTextNode(
                `${obj.city}, ${obj.state} ${obj.zipcode}`
            )
        )
        line3.setAttribute("class", "address__line3")
        elem.appendChild(line3)
    }
}

const setBusinessHoursList = function(elem, objList) {
    console.log(objList)
    if(objList.length > 0) {

        let businessHours = document.createElement("ul")
        businessHours.setAttribute("class", "business-hour__list")
        for(let obj of objList) {
            let entry = document.createElement("li")
            entry.setAttribute("class", "business-hour__entry")

            let label = document.createElement("span")
            label.setAttribute("class", "business-hour__day")
            label.appendChild(document.createTextNode(obj.day.name + ":"))

            let timeRange = document.createElement("span")
            timeRange.setAttribute("class", "business-hour__time")
            setTimeRangeText(timeRange, obj.start_time, obj.end_time)

            entry.appendChild(label)
            entry.appendChild(timeRange)
            businessHours.appendChild(entry)
        }
        elem.appendChild(businessHours)
    }
}

const getLocationContext = async function() {
    var apiUrl = "/api" + window.location.pathname
    var apiHandler = new AjaxApiHandler(apiUrl, "GET")

    var location = await apiHandler.execute()
        .then(xhr => {
            return xhr.response
        })
        .catch(xhr => {
            console.log(xhr.error)
            return null
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

        document.querySelector(".phone").textContent = location.phone
        document.querySelector(".fax").textContent = location.fax
        document.querySelector(".website a").setAttribute("href", location.website)

        setBusinessHoursList(document.querySelector(".business-hours-section"), location.op_hours)
        
        document.getElementById("date-created").textContent = location.date_created
        document.getElementById("last-updated").textContent = location.last_updated
    } else {
        // Failure to 404 - redirect?
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getLocationContext()

    const employerToggle = document.getElementById("employer-info--toggle")
    employerToggle.addEventListener("click", function(event) {
        var box = document.querySelector(".sliding-box")
        if(box.style.display == "none") 
            box.style.display = "block"
        else
            box.style.display = "none"
    })
})