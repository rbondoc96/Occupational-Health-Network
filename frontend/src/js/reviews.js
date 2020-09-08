import "./components/cards/review-card"

import "../scss/reviews.scss"

const renderReviews = function(wrapper) {
    const slug = window.location.pathname.split("/")[3]

    fetch(`http://127.0.0.1:8000/api/reviews/?slug=${slug}`)
    .then(response => response.json())
    .then(json => {
        console.log(json)

        for(let rev of json) {
            let markup = `
                <review-card>
                    <p slot="comments">${rev.comments}</p>
                    <span slot="date-edited">${rev.date_edited}</span>
                    <span slot="date-submitted">${rev.date_submitted}</span>
                    <input type="hidden" class="review-type" value="${rev.review_type}">
                    <input type="hidden" class="id" value="${rev.id}">
                    <input type="hidden" class="rating" value="${rev.rating}">
                    <input type="hidden" class="owner" value="${rev.owner}">
                </review-card>
            `
        
            wrapper.innerHTML += markup
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const reviewList = document.querySelector(".review-list")
    
    renderReviews(reviewList)
})