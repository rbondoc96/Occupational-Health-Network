import DaysIcon from "../../../assets/calendar.svg"

var template = document.createElement("template")
template.innerHTML = `
    <style>
    .wrapper {
        margin: 15px 10px;
        display: flex;
        flex-direction: column;
    }
    .service {
        font-weight: 700;
    }
    .days {
        margin-bottom: 2px;
    }
    @media only screen and (max-width: 992px) {
        .wrapper {
            align-items: center;
        }
    }    
    </style>
    <div class="wrapper">
        <div class="line1">
            <span class="service"><slot name="service"></slot></span>
            <span class="time-range"><slot name="time-range"></slot></span>
        </div>
        <div class="line2">
            <img src="${DaysIcon}">
            <span class="days"><slot name="days"></slot></span>
        </div>
    </div>
`

class ServiceHourCard extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        var daysSlot = this.querySelector("[slot='days']")
        if(daysSlot.textContent == "") 
            this.shadowRoot.querySelector(".line2").style.display = "none"
    }
}

window.customElements.define("service-hour-card", ServiceHourCard)