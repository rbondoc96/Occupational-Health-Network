import React from "react"

export default function CheckboxInput({
    id,
    name,
    label,
    value,
}) {

    return(
        <div className="checkbox-input">
            <label htmlFor={id}>
                <input 
                id={id}
                name={name}
                value={value}
                type="checkbox"
                />
                <span className="checkbox-input-label">{label}</span>
            </label>
        </div>
    )
}