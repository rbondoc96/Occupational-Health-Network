import React from "react"

export default function TextInput({
    id,
    type="text",
    name,
    label,
    message,
    required=false,
    handleChange,
    placeholder,
    icon,
    className,
    maxLength,
}) {

    return(
        <div className={`text-input ${className?className:""}`}>
            {icon}
            {label && <label for={id} className={`label ${required? "required-label" :""}`}>{label}</label>}
            <input 
            type={type} 
            id={id} 
            className={icon? "":"iconless-input"}
            placeholder={placeholder}
            name={name? name : id} 
            maxLength={maxLength}
            required={required} 
            onChange={handleChange}/>
            <p>{message}</p>
        </div>
    )
}