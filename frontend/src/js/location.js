import "../scss/location.scss"
import AjaxApiHandler from "./ajax-api-handler"

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
    if(objList.length != 0) {
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
    if(length != 0) {
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
    var sortedList = {}

    for(let obj of objList) {
        let category = obj.service_category.name
        
        if(sortedList[category] == undefined) 
            sortedList[category] = [obj.name]
        else 
            sortedList[category].push(obj.name)
    }

    return sortedList
}

const setServicesText = function(elem, objList) {
    var sortedList = sortServicesByCategory(objList)

    for(let item of Object.keys(sortedList)) {
        var itemHeader = document.createElement("h2")
        // itemHeader.setAttribute("class", "")
        console.log(item)
        console.log(sortedList[item])
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
    } else {
        // redirect?
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