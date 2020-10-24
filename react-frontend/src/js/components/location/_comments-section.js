import React, {useContext} from "react"

import {LocationContext} from "../../context/location-context"

import CommentCard from "./comment-card"

export default function CommentsSection({

}) {
    const [info, setInfo] = useContext(LocationContext)

    return(
        <section className="comments-section">
            <h2>User Comments</h2>
            <div className="comment-cards">
                {info.comments && info.comments.map((comment, idx) => {
                        return <CommentCard key={idx} author={comment.author} comments={comment.comment} dateSubmitted={comment.date_submitted} dateEdited={comment.date_edited} />
                    })
                }
            </div>
        </section>
    )
}