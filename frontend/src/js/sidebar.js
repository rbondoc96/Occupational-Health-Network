import "../scss/sidebar.scss"
import variables from "../scss/sidebar.scss"

class Sidebar {
    constructor(wrapper, isExpanded=true) {
        this.breakpoint = window.matchMedia("(min-width: 1330px)")
        
        this.wrapper = wrapper
        this.logo = wrapper.querySelector(".logo__wrapper")
        this.logoMini = wrapper.querySelector(".logo__wrapper--mini")

        this.toggleButton = wrapper.querySelector(".sidebar--toggle")
        this.navButtons = wrapper.getElementsByClassName("nav-button")
        this.navItems = wrapper.getElementsByClassName("sidebar__nav-item")

        this.header = wrapper.querySelector(".sidebar__header")
        this.footer = wrapper.querySelector(".footer")
        this.nav1 = wrapper.querySelector(".sidebar__nav1")
        this.nav2 = wrapper.querySelector(".sidebar__nav2")

        this.isExpanded = isExpanded

        this.wrapper.addEventListener("mouseenter", this.toggleButtonSlideOut.bind(this, this.toggleButton), false)
        this.wrapper.addEventListener("mouseleave", this.toggleButtonSlideIn.bind(this, this.toggleButton), false)
    }

    toggleButtonSlideIn(toggleButton, event) {
        toggleButton.style.left = "-270px"
        toggleButton.style.transition = "0.3s"
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
    toggle() {
        const content = document.getElementById("content")

        if(this.getExpandedState() == true) {
            /* Collapse sidebar */
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
            this.nav2.style.margin = "calc(20px + 11vh) 0"

            this.footer.style.flexDirection = "column"
            this.footer.style.justifyContent = "center"
            this.footer.querySelector("a").style.marginRight = "0"
            this.footer.querySelector(".footer__copyright").style.fontSize = "10px"

            content.style.marginLeft = variables.sidebarWidthSm
            this.toggleButton.style.left = "-40px";
            this.toggleButton.style.marginLeft = variables.sidebarWidthSm
            
            this.setExpandedState(false)
        } else { 
            /* Expand Sidebar */
            this.logo.style.display = "block";
            this.logoMini.style.display = "none";

            for(let item of this.navButtons)
                item.classList.remove("nav-button--collapsed")

            for(let item of this.navItems) {
                item.style.paddingLeft = "25px";
                item.querySelector("svg").style.marginRight = "40px"
                item.querySelector("p").style.marginTop = "0"
            } 

            this.wrapper.style.width = variables.sidebarWidthReg
            this.nav2.style.margin = "calc(50px + 11vh) 0"

            this.footer.style.flexDirection = "row"
            this.footer.style.justifyContent = "flex-start"
            this.footer.querySelector("a").style.marginRight = "16px"
            this.footer.querySelector(".footer__copyright").style.fontSize = "1rem"

            content.style.marginLeft = variables.sidebarWidthReg
            this.toggleButton.style.top = "0px"
            this.toggleButton.style.left = "0px"
            this.toggleButton.style.marginLeft = variables.sidebarWidthReg

            this.setExpandedState(true)
        }
    }
}

export default Sidebar
