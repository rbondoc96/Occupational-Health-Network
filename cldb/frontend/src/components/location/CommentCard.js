import React, {useEffect, useContext, useRef} from "react"

import {UserContext} from "../../context/UserContext"
import {LocationContext} from "../../context/LocationContext"

import Button from "../inputs/Button"

export default function CommentCard({
    id,
    author,
    comments,
    dateSubmitted,
    dateEdited,
}) {
    const cardRef = useRef(null)

    const [auth, setAuth] = useContext(UserContext)
    const [info, setInfo] = useContext(LocationContext)

    const handleClick = event => {
        if(confirm("Are you sure you want to delete this comment?")) {
            fetch(`/api/location_comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${auth.token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(json => {
                setInfo({
                    ...info,
                    comments: json
                })
            })
        }
    }

    return(
        <div className="commentCard" ref={cardRef}>
            <div className="commentCard-header">
                {author && <div>
                    <span className="location-label">Author: </span>{author}
                </div>}
                <div>
                    <span className="location-label">Date Created: </span>{dateSubmitted}
                </div>
                <div>
                    <span className="location-label">Last Edited: </span>{dateEdited}
                </div>
            </div>
            <div className="commentCard-comments">
                {comments}
            </div>
            {
                auth.user && auth.user.username == author && <div className="commentCard-delete">
                    <Button 
                        secondary
                        handleClick={handleClick}
                        children={"Delete Comment"}
                    />
                </div>
            }
        </div>
    )
}