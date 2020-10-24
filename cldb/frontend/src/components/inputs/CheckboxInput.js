import React from "react"

import "../../styles/inputs.scss"

export default function CheckboxInput({
    id,
    name,
    label,
    value,
    handleChange,
    checked,
}) {

    return(
        <div className="checkboxInput">
            <label htmlFor={id}>
                <input 
                checked={checked}
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