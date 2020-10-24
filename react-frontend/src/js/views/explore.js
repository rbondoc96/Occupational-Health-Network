import React from "react"

import ExploreForm from "../components/forms/_explore-form"

import "../../scss/views/explore.scss"

export default function Explore({

}) {

    return(
        <div className="container explore">
            <ExploreForm />
            <div className="explore-results">
                Results
            </div>
        </div>
    )
}