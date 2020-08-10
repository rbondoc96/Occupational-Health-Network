import regeneratorRuntime from "regenerator-runtime"

import "./main.scss"

import Sidebar from "./js/sidebar"

const toggleSidebar = function(sidebarObject, event) {
    sidebarObject.toggle()
}

const mediaQueryHandler = function(sidebar, event) {
    if(event.matches && sidebar.getExpandedState() == true) { /* Viewport is 1330px or less */
        sidebar.toggle()        
    } else if (!(event.matches || sidebar.getExpandedState() == true)){
        sidebar.toggle()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.querySelector(".sidebar--toggle")
    const sidebar = new Sidebar(document.querySelector(".sidebar__wrapper"))

    /* Initial media query for page load */
    const mediaQuery = window.matchMedia("(max-width: 1200px)")
    if(mediaQuery.matches)
        sidebar.collapse()
    else
        sidebar.expand()
    mediaQuery.addListener(mediaQueryHandler.bind(this, sidebar))

    sidebarToggle.addEventListener("click", toggleSidebar.bind(this, sidebar), false)
})