import React from "react"

import "../../../../scss/components/forms/inputs.scss"

export default function CheckboxInput({
    id,
    name,
    label,
    value,
    handleChange,
}) {

    return(
        <div className="checkboxInput">
            <label htmlFor={id}>
                <input 
                id={id}
                name={name}
                value={value}
                type="checkbox"
                onChange={handleChange}
                />
                <span className="checkboxInput-label">{label}</span>
            </label>
        </div>
    )
}