var template = document.createElement("template")
template.innerHTML = `
    <style>
    .wrapper {
        border: 1px solid #ccc;
        border-radius: 0.25em;

        padding: 10px 15px;
        margin: 20px 0;
    }
    .review-type {
        font-size: 1.1rem;
        font-weight: 700;
        margin-top: 8px;
    }
    .stars-outer {
        position: relative;
        display: inline-block;

        margin-top: 8px;
        margin-bottom: 15px;
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

    .comments .label {
        font-size: 1.1rem;
        margin-bottom: 15px;
    }

    .comments {
        margin-bottom: 15px;
    }

    .meta {
        display: flex;
        flex-direction: column;
        
        margin-bottom: 4px;
    }
    .label {
        font-weight: 700;
    }
    </style>
    <div class="wrapper">
        <div class="review-type">
            <span class="review-type--text"></span>
        </div>
        <div class="rating-wrapper">
            <div class="stars-outer">
                <div class="stars-inner">

                </div>
            </div>
        </div>
        <div class="comments">
            <div class="label">Comments</div>
            <slot name="comments"></slot>
        </div>
        <div class="meta">
            <div class="date-edited">
                <span class="label">Last Edited: </span>
                <span class="date">
                    <slot name="date-edited"></slot>
                </span>
            </div>
            <div class="date-submitted">
                <span class="label">Date Submitted: </span>
                <span class="date">
                    <slot name="date-submitted"></slot>
                </span>
            </div>
        </div>
    </div>
`

class ReviewCard extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    setReviewType() {
        let reviewType = this.querySelector(".review-type").value
        let reviewTypeText = this.shadowRoot.querySelector(".review-type--text")

        console.log(reviewType)
        console.log(reviewTypeText)

        reviewTypeText.textContent = (reviewType == 2) ? "Administrative Review" : "Patient Review"
    }

    convertDates() {
        let dateEdited = this.querySelector("[slot='date-edited']")
        let dateSubmitted = this.querySelector("[slot='date-submitted']")

        let dateObj1 = new Date(dateEdited.textContent)
        let dateObj2 = new Date(dateSubmitted.textContent)

        dateEdited.textContent = dateObj1.toDateString()
        dateSubmitted.textContent = dateObj2.toDateString()
    }

    setStarRating(rating) {
        const wrapper = this.shadowRoot.querySelector(".rating-wrapper")
        let starsFill = wrapper.querySelector(".stars-inner")
        
        // There are 5 stars to fill
        let starsPercent = (rating / 5.0) * 100
        starsPercent = `${Math.round(starsPercent/10) * 10}%`

        starsFill.style.width = starsPercent
    }

    connectedCallback() {
        this.comments = this.querySelector("[slot='comments']")
        this.rating = this.querySelector(".rating")
        this.setStarRating(this.rating.value)
        
        this.convertDates()
        this.setReviewType()

        if(this.comments.textContent == "")
            this.shadowRoot.querySelector(".comments").style.display = "none"
    }
}

window.customElements.define("review-card", ReviewCard)