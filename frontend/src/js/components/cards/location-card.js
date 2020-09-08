import PhoneIcon from "../../../assets/phone-icon.svg"
import FaxIcon from "../../../assets/fax-icon.svg"

var template = document.createElement("template")
template.innerHTML = `
    <style>
    ::slotted(a) {
        text-decoration: none;
        margin-right: 8px !important;
    }
    .wrapper {
        max-width: 1220px;
        max-height: 220px;
        padding: 1.5rem 2.0rem;
        border: 1px solid #000;

        overflow-x: visible;
    }

    .clinic-name {
        font-size: 1.3rem;
        font-weight: 700;
    }
    .branch-name {
        font-size: 1rem;
    }

    .stars-outer {
        position: relative;
        display: inline-block;
    }

    .stars-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        white-space: nowrap;
        overflow: hidden;
    }

    .stars-outer::before {
        content: "\\f005 \\f005 \\f005 \\f005 \\f005";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 1.2rem;
        color: #ccc;
    }
    .stars-inner::before {
        content: "\\f005 \\f005 \\f005 \\f005 \\f005";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 1.2rem;
        color: #C0D735;
    }

    .info {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        margin: 10px 0;
    }
    .info__left {
        display: flex;
        flex-direction: column;
    }
    .phone img, .fax img {
        margin-right: 5px;
    }

    .detail-link {
        margin-right: 10px;
        text-decoration: none;
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    
    @media only screen and (max-width: 600px) {
        ::slotted(a) {
            margin-right: 0px !important;
        }        
        .wrapper {
            min-height: 300px;
            margin-right: 0;
        }
        .info {
            flex-direction: column;
        }
        .info__right {
            margin-top: 15px;
        }

        .footer {
            flex-direction: column;
        }
    }
    </style>
    <div class="wrapper">
        <div class="header">
            <span class="clinic-name">
                <slot name="clinic-name"></slot>
            </span>
            <span class="branch-name">
                <slot name="branch-name"></slot>
            </span>
        </div>
        <div class="reviews">
            <div class="stars-outer">
                <div class="stars-inner">

                </div>
            </div>
            <span class="total-reviews"></span>
        </div>
        <div class="info">
            <div class="info__left">
                <slot name="street1"></slot>
                <slot name="street2"></slot>
                <slot name="street3"></slot>
            </div>
            <div class="info__right">
                <div class="status">
                    <slot name="is-open"></slot>
                </div>
                <div class="phone">
                    <img src="${PhoneIcon}">
                    <slot name="phone"></slot>
                </div>
                <div class="fax">
                    <img src="${FaxIcon}">
                    <slot name="fax"></slot>
                </div>
            </div>
        </div>
        <div class="footer">
            <slot name="detail-link"></slot>
            <slot name="review-link"></slot>
        </div>
    </div>
`

class LocationCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.reviewPopup = this.reviewPopup.bind(this)
    }

    reviewPopup(event) {
        window.open(`/locations/${this.slug}/review`, "_blank", `
            location=yes,
            height=800,
            width=700, 
            top=${(screen.height - 800) / 4}
            left=${(screen.width - 700) / 2}
        `)
    }

    setStarRating(average) {
        const wrapper = this.shadowRoot.querySelector(".reviews")
        let starsFill = wrapper.querySelector(".stars-inner")
        
        // There are 5 stars to fill
        let starsPercent = (average / 5.0) * 100
        starsPercent = `${Math.round(starsPercent/10) * 10}%`

        starsFill.style.width = starsPercent
        wrapper.appendChild(document.createTextNode(` out of ${this.totalReviews.value} reviews`))
    }

    connectedCallback() {
        this.status = this.querySelector("[slot='is-open']")
        this.reviewLink = this.querySelector("[slot='review-link']")
        this.slug = this.reviewLink.getAttribute("data-slug")

        this.avgReviews = this.querySelector(".avg-reviews")
        this.totalReviews = this.querySelector(".total-reviews")

        this.setStarRating(this.avgReviews.value)

        this.status.style.fontWeight = "700"
        this.status.style.textAlign = "right"
        if(this.status.textContent.toLowerCase().includes("open")) {
            this.status.style.color = "#44CF6C"
        } else if(this.status.textContent.toLowerCase().includes("closing")) {
            this.status.style.color = "#cece74"
        } else if(this.status.textContent.toLowerCase().includes("closed")) {
            this.status.style.color = "#C21C1C"
        }

        this.reviewLink.addEventListener("click", this.reviewPopup)
    }

    disconnectedCallback() {
        this.reviewLink.removeEventListener("click", this.reviewPopup)
    }
}
window.customElements.define("location-card", LocationCard)