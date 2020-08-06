const Days = [
    "",
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday",
    "Sunday", 
]

var updateLocationField = (data, field) => {
    let csrftoken = getCookie("csrftoken")
    let id = String($("#locationID").html())
    let api = window.location.origin + "/api/locations/" + id + "/"

    let json = {
        [field]: data,
    }

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
            console.log(`<${field}> updated successfully.`)
            receivedData = data
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ": " + xhr.responseText)
            console.log(`ERROR. Could not update field <${field}>`)
            error = true;
        },
    })

    return {
        error: error,
        data: receivedData,
    }
}

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

var commentsListener = event => {
    let csrftoken = getCookie("csrftoken")
    let id = String($("#locationID").html())
    let api = window.location.origin + "/locator/api/location/" + id + "/"
    let autosave = $("#commentsAutosave").prop("checked")

    if(autosave) { 
        let error = updateLocationField(event.target.value, "comments").error
        if(!error)
            console.log("Error in updating field")
    }
}

var saveComments = event => {
    let error = updateLocationField($("#comments").val(), "comments").error
    let status = document.getElementById("save-status").firstChild

    if(!error)
        status.nodeValue = "Comments saved!"
}

var verifyLocation = (event) => {
    let csrftoken = getCookie("csrftoken")
    let id = String($("#locationID").html())
    let api = window.location.origin + "/locator/api/location/" + id + "/"

    console.log(api)

    let nums = new Date().toLocaleDateString().split("/")
    let year = nums.splice(-1)[0]
    nums.splice(0, 0, year)
    
    // Date Format: YYYY-MM-DD
    let date_str = nums.join("-")

    let error = updateLocationField(date_str, "last_verified").error
    if(!error) {
        window.location.reload(true)
    }
}

var autosaveToggleListener = (event) => {
    let isChecked = $("#commentsAutosave").prop("checked")
    let status = document.getElementById("save-status").firstChild
    console.log(isChecked)

    // The default is that autosave is off.
    if(isChecked) {
        status.nodeValue = "Autosave is on"
        $("#commentsBtn").attr("disabled", true)
        $("#commentsBtn").addClass("disabled")
    }
    else { 
        status.nodeValue = "Autosave is off"
        $("#commentsBtn").attr("disabled", false)
        $("#commentsBtn").removeClass("disabled")
    }
}

var submitReview = event => {
    console.log("hi")
    let locationId = parseInt($("#locationID").html())
    let userId = parseInt($("#userID").html())
    let liked = $("#like").prop("checked")
    let disliked = $("#dislike").prop("checked")
    let comments = $("#review-comments").val()

    console.log(locationId)
    let json = {
        location_id: locationId,
        author_id: userId,
        like: liked,
        dislike: disliked,
        comments: comments,
    }
    console.log(json.location_id)
    let csrftoken = getCookie("csrftoken")
    let api = window.location.origin + "/locator/api/review/"

    $.ajax({
        url: api,
        method: "POST",
        data: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        success: (data) => {
            window.location.reload(true)
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ": " + xhr.responseText)
            console.log(`ERROR. Could not send review`)
        },
    })
}

var deleteLocation = event => {
    let shouldDelete = confirm("WARNING. This action cannot be undone. Continue deleting location?")
    let isUserLoggedIn = String($("#isUserAuth").html()).toLowerCase()

    if(shouldDelete && isUserLoggedIn == "true") {
        let csrftoken = getCookie("csrftoken")
        let api = window.location.origin + $("#deleteURL").attr("href")

        $.ajax({
            method: "POST",
            url: api,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            success: data => {
                window.location.href = window.location.origin
            },
            error: (xhr, errmsg, err) => {
                console.log(xhr.status + ": " + xhr.responseText)
                console.log(`ERROR. Could not delete field <${field}>`)
            }, 
        })
    } else if (isUserLoggedIn == "false") {
        alert("Unauthorized delete!")
    }
}

var initReviews = () => {
    let likes = parseInt($("#likes").html())
    let dislikes = parseInt($("#dislikes").html())
    let reviews = parseInt($("#totalReviews").html())
    let percentPos = null
    let text = $("#percentPosReviews")

    if(reviews > 0) {
        percentPos = likes * 100.0 / reviews
        text.html(percentPos.toFixed(2) + "%")
    } else {
        percentPos = 0
        $("#percentPosReviews").html("0")
    }

    text.css("font-weight", "500")
    text.css("text-decoration", "underline")

    // Not caring about precision since it's just text styling
    if(percentPos > 70.0) 
        text.css("color", "#44CF6C")
    else if(percentPos <= 70.0 && percentPos > 40.0) 
        text.css("color", "#FAC05E")
    else 
        text.css("color", "#EF6F6C")
    
    if(reviews > 0)
        $("#posReviewsLabel").html(`positive reviews out of ${reviews}`)
    else 
        $("#posReviewsLabel").html("reviews")
}

var closedOr24 = (idx, elem) => {
    let startTime = String($(elem).children()
                        .filter(".startTime").html())
                            .trim()
    let endTime = String($(elem).children()
                        .filter(".endTime").html())
                            .trim()        
    if (startTime == "11:59 p.m." && endTime == "11:59 p.m.") 
        $(elem).html("CLOSED")
    else if (startTime == "12:00 a.m." && endTime == "12:00 a.m.") 
        $(elem).html("Open 24 Hours")
}


var init = () => {
    $(".timeRange").each(closedOr24)
    console.log(String($("#callable").html()).toLowerCase())
    if(String($("#callable").html()).toLowerCase().trim() == "true")
        $("#callable-label").toggleClass("green-check")
    else
        $("#callable-label").toggleClass("red-check")

    initReviews()
    $("#reviewBtn").hover(event => {
        let target = $(event.target)
        let thumbsUp = $(".fa-thumbs-up")
        target.css("background-color", "#fff")
        target.css("color", "#f84c3f")
        thumbsUp.css("color", "#f84c3f")
    })
    $("#reviewBtn").on("mouseleave", event => {
        let target = $(event.target)
        let thumbsUp = $(".fa-thumbs-up")
        target.css("background-color", "#f84c3f")
        target.css("color", "#fff")
        thumbsUp.css("color", "#fff")
    })

    $("#verifyBtn").on("click", verifyLocation)
    $("#reviewBtn").on("click", () => {
        $("#review-modal").modal("toggle")
    })
    // $("#comments").on("keyup", commentsListener) 
    // $("#commentsAutosave").on("change", autosaveToggleListener) //  Disabling autosave
    $("#commentsBtn").on("click", saveComments)

    let likeBtn = $("#likeBtn")
    let dislikeBtn = $("#dislikeBtn") 

    $("#like").on("click", event => {
        if(event.target.checked){
            likeBtn.css("background-color", "#437eff")
            likeBtn.css("border-color", "#437eff")
            likeBtn.css("color", "#fff")

            dislikeBtn.css("background-color", "#fff")
            dislikeBtn.css("border-color", "#000")
            dislikeBtn.css("color", "#000")
        }
    })
    $("#dislike").on("click", event => {
        if(event.target.checked){
            dislikeBtn.css("background-color", "#f84c3f")
            dislikeBtn.css("border-color", "#f84c3f")
            dislikeBtn.css("color", "#fff")

            likeBtn.css("background-color", "#fff")
            likeBtn.css("border-color", "#000")
            likeBtn.css("color", "#000")
        }
    })
    $("#reviewSubmitBtn").on("click", submitReview)
    $("#deleteBtn").on("click", deleteLocation)
}

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

    var query = $("#street_line_1").html() + " " + $("#street_line_2").html() + ", " + $("#city").html() + " " + $("#state").html() + ", " + $("#zipcode").html()
    var request = {
        query: query,
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
}
document.head.appendChild(script);

$(document).ready(init)