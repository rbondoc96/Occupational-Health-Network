import MailIcon from "../../../assets/mail-icon.svg"
import PhoneIcon from "../../../assets/phone-icon.svg"

var template = document.createElement("template")
template.innerHTML = `
    <style>
    .wrapper {
        margin: 15px 10px;
        display: flex;
        flex-direction: column;
    }
    .name {
        font-weight: 700;
    }
    .email, .phone {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    img {
        margin-right: 5px;
        margin-top: -2px;
    }
    @media only screen and (max-width: 992px) {
        .wrapper {
            align-items: center;
        }
    }
    </style>
    <div class="wrapper">
        <div class="line1">
            <span class="name"><slot name="name"></slot></span>
            <span class="title"><slot name="title"></slot></span>
        </div>
        <div class="email">
            <img src="${MailIcon}">
            <slot name="email"></slot>
        </div>
        <div class="phone">
            <img src="${PhoneIcon}">
            <slot name="phone"></slot>
        </div>
    </div>
`

class ContactCard extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        var emailSlot = this.querySelector("[slot='email']")
        if(emailSlot.textContent == "") 
            this.shadowRoot.querySelector(".email").style.display = "none"

        var phoneSlot = this.querySelector("[slot='phone']")
        if(phoneSlot.textContent == "") 
            this.shadowRoot.querySelector(".phone").style.display = "none"
    }

    disconnectedCallback() {

    }
}

window.customElements.define("contact-card", ContactCard)