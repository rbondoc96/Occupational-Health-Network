import React, {useContext, useState} from "react"
import cookie from "react-cookies"

import {UserContext} from "../../context/UserContext"
import {LocationContext} from "../../context/LocationContext"

import CommentCard from "./CommentCard"

import Button from "../inputs/Button"

export default function CommentsSection({

}) {
    const [info, setInfo] = useContext(LocationContext)
    const [auth, setAuth] = useContext(UserContext)

    const [form, setForm] = useState({
        location: info.id,
        comment: ""
    })

    const handleChange = event => {
        let self = event.target
        
        setForm({
            ...form,
            author: auth.user.id,
            [self.getAttribute("name")]: self.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        let formNode = event.target
        
        let csrfcookie = cookie.load("csrftoken")
        let input = `<input type="hidden" name="csrfmiddlewaretoken" value="${csrfcookie}">`
        formNode.insertAdjacentHTML("beforeend", input)

        fetch(formNode.getAttribute("action"), {
            method: "POST",
            headers: {
                "Authorization": `Token ${auth.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        .then(res => res.json())
        .then(json => {
            setInfo({
                ...info,
                comments: json
            })
        })
    }

    return(
        <>
        {
            info.comments.length > 0 && <section className="comments-section">
                <h2>User Comments</h2>
                {
                    auth.isAuthenticated && <div className="comments-form">
                        <form
                        onSubmit={handleSubmit}
                        method="POST"
                        action="/api/location_comments/"
                        >
                            <div className="location-label">
                                Add a Comment
                            </div>
                            <div className="form-input">
                                <textarea 
                                onChange={handleChange}
                                name="comment"></textarea>
                            </div>
                            <Button type="submit" children={"Submit Comment"} />
                        </form>
                    </div>
                }
                <div className="commentCards">
                    {info.comments && info.comments.map(comment => {
                            return <CommentCard 
                            key={comment.id} 
                            id={comment.id} 
                            author={comment.author} 
                            comments={comment.comment} 
                            dateSubmitted={comment.date_submitted} 
                            dateEdited={comment.date_edited} />
                        })
                    }
                </div>
            </section>
        }
        </>
    )
}