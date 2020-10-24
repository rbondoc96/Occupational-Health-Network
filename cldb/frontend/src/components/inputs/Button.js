import React from "react"

import "../../styles/inputs.scss"

export default function Button({
    type="button",
    id,
    href,
    children,
    secondary,
    handleClick,
    openNewTab=false,
    size="small"
}) {

    return(
        <>
        {href
        ? <a href={href} target={openNewTab ? "_blank" : ""}>
            <button id={id} type="button" className={`button ${secondary? "button-secondary":""} ${size=="small"? "button--small":""}`} onClick={handleClick}>
                {children}
            </button>
        </a>
        : <button id={id} type={type} className={`button ${secondary? "button-secondary":""} ${size=="small"? "button--small":""}`} onClick={handleClick}>
            {children}
        </button>
        }
        </>
    )
}