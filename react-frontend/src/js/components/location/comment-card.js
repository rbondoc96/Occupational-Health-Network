import React, {useEffect} from "react"

export default function CommentCard({
    author,
    comments,
    dateSubmitted,
    dateEdited,
}) {

    return(
        <div className="comment-card">
            {author && <h3>{author}</h3>}
            {comments && <div>{comments}</div>}
            {dateSubmitted && <div>Date Submitted: {dateSubmitted}</div>}
            {dateEdited && <div>Last Edited: {dateEdited}</div>}
        </div>
    )
}