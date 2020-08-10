import "../scss/sidebar.scss"
import variables from "../scss/sidebar.scss"
import { timers } from "jquery"

class Sidebar {
    constructor(wrapper, isExpanded=true) {
        this.breakpoint = window.matchMedia("(min-width: 1100px)")
        
        this.wrapper = wrapper
        this.logo = wrapper.querySelector(".logo__wrapper")
        this.logoMini = wrapper.querySelector(".logo__wrapper--mini")

        this.toggleButton = wrapper.querySelector(".sidebar--toggle")
        this.navButtons = wrapper.getElementsByClassName("nav-button")
        this.navItems = wrapper.getElementsByClassName("sidebar__nav-item")

        this.header = wrapper.querySelector(".sidebar__header")
        this.footer = wrapper.querySelector(".sidebar__footer")
        this.nav1 = wrapper.querySelector(".sidebar__nav1")
        this.nav2 = wrapper.querySelector(".sidebar__nav2")

        this.isExpanded = isExpanded

        this.wrapper.addEventListener("mouseenter", this.toggleButtonSlideOut.bind(this, this.toggleButton), false)
        this.wrapper.addEventListener("mouseleave", this.toggleButtonSlideIn.bind(this, this.toggleButton), false)

        this.toggleButtonSlideIn(this.toggleButton, null)
    }

    toggleButtonSlideIn(toggleButton, event) {
        toggleButton.style.left = "-40px"
    }
    toggleButtonSlideOut(toggleButton, event) {
        toggleButton.style.left = "0px"
        toggleButton.style.transition = "0.3s"
    }

    setExpandedState(bool) {
        this.isExpanded = bool
    }
    getExpandedState() {
        return this.isExpanded;
    }
    collapse() {
        const content = document.getElementById("content")

        this.logo.style.display = "none";
        this.logoMini.style.display = "flex";

        for(let btn of this.navButtons) 
            btn.classList.add("nav-button--collapsed")

        for(let item of this.navItems) {
            item.style.paddingLeft = "0";
            item.querySelector("svg").style.marginRight = "0"
            item.querySelector("p").style.marginTop = "5px"
        }

        this.wrapper.style.width = variables.sidebarWidthSm
        this.nav2.style.margin = "calc(20px + 10vh) 0"
        this.nav2.querySelector(".disclaimer__wrapper p").style.display = "none"

        this.footer.style.flexDirection = "column"
        this.footer.style.justifyContent = "center"
        this.footer.querySelector("a").style.marginRight = "0"
        this.footer.querySelector(".sidebar__footer__copyright").style.fontSize = "10px"

        content.style.marginLeft = variables.sidebarWidthSm
        content.style.maxWidth = `calc(100vw - ${variables.sidebarWidthSm})`
        this.toggleButton.style.left = "-40px"
        this.toggleButton.style.marginLeft = variables.sidebarWidthSm
        
        this.setExpandedState(false)
    }
    expand() {
        const content = document.getElementById("content")

        this.logo.style.display = "block";
        this.logoMini.style.display = "none";

        for(let item of this.navButtons)
            item.classList.remove("nav-button--collapsed")

        for(let item of this.navItems) {
            item.style.paddingLeft = "25px";
            item.querySelector("svg").style.marginRight = "25px"
            item.querySelector("p").style.marginTop = "0"
        } 

        this.wrapper.style.width = variables.sidebarWidthReg
        this.nav2.style.margin = "calc(50px + 11vh) 0"
        this.nav2.querySelector(".disclaimer__wrapper p").style.display = "block"

        this.footer.style.flexDirection = "row"
        this.footer.style.justifyContent = "flex-start"
        this.footer.querySelector("a").style.marginRight = "1px"
        this.footer.querySelector(".sidebar__footer__copyright").style.fontSize = "1rem"

        content.style.marginLeft = variables.sidebarWidthReg
        content.style.maxWidth = `calc(100vw - ${variables.sidebarWidthReg})`
        this.toggleButton.style.top = "0px"
        this.toggleButton.style.left = "0px"
        this.toggleButton.style.marginLeft = variables.sidebarWidthReg

        this.setExpandedState(true)
    }
    toggle() {
        if(this.getExpandedState() == true) {
            this.collapse()
        } else { 
            this.expand()
        }
    }
}

export default Sidebar
