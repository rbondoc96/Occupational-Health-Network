
var subnavTransition = () => {
    var subnav = document.getElementById("subnav")
    var pos = 0
    const slide = () => {
        if(pos == 116)
            clearInterval(transition)
        else {
            pos++
            subnav.style.top = pos + "px"
            console.log(pos)
        }
    }
    let transition = setInterval(slide, 100)
}

var addToSubnav = (linkStr, href) => {
    let subnavContainer = $("#subnav li.nav-item")
    let link = document.createElement("a")
    let text = document.createTextNode(linkStr)
    link.setAttribute("href", href)
    link.setAttribute("class", "subnav-link")
    link.appendChild(text)
    subnavContainer.append(link)
}

var init = () => {
    $("#subnav").hide()

    $("#ttBtn").hover((event) => {
        $("#subnav li.nav-item").empty()
        addToSubnav("Home", "#")
        $("#subnav").slideDown("fast")
        $(event.target).closest("li").css("background-color", "#B8B7B4")
    })
    $("#ttBtn").on("mouseleave", (event) => {
        if($(event.target).is(":focus")) {
            $(event.target).closest("li").css("background-color", "#B8B7B4")
        } else {
            $(event.target).closest("li").css("background-color", "#FFF")
            $("#subnav").slideUp(75)
            $("#subnav li.nav-item").empty()
        }
    })
    $("#ttBtn").blur((event) => {
        $(event.target).closest("li").css("background-color", "#FFF")
    })

    $("#ceBtn").hover((event) => {
        $("#subnav li.nav-item").empty()
        let addLink = window.location.origin + "/locator/location/new"
        addToSubnav("Add a Location", addLink)
        addToSubnav("Search for a Location", "#")
        $("#subnav").slideDown("fast")
        $(event.target).closest("li").css("background-color", "#B8B7B4")
    })
    $("#ceBtn").on("mouseleave", (event) => {
        if($(event.target).is(":focus")) {
            $(event.target).closest("li").css("background-color", "#B8B7B4")
        } else {
            $(event.target).closest("li").css("background-color", "#FFF")
            $("#subnav").slideUp(75)
            $("#subnav li.nav-item").empty()
        }
    })
    $("#ceBtn").blur((event) => {
        $(event.target).closest("li").css("background-color", "#FFF")
    })

    $("#pmBtn").hover((event) => {
        $("#subnav li.nav-item").empty()
        addToSubnav("Not Sure", "#")
        $("#subnav").slideDown("fast")
        $(event.target).closest("li").css("background-color", "#B8B7B4")
    })
    $("#pmBtn").on("mouseleave", (event) => {
        if($(event.target).is(":focus")) {
            $(event.target).closest("li").css("background-color", "#B8B7B4")
        } else {
            $(event.target).closest("li").css("background-color", "#FFF")
            $("#subnav").slideUp(75)
            $("#subnav li.nav-item").empty()
        }
    })
    $("#pmBtn").blur((event) => {
        $(event.target).closest("li").css("background-color", "#FFF")
    })
}

$(document).ready(init)