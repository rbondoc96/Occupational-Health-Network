import React from "react"

import "../../styles/inputs.scss"

export default function TextInput ({
    label,
    type="text",
    id,
    name,
    required=false,
    handleChange,
    defaultValue,
    message,
    validationMessage,
    maxLength,
    placeholder,
    size="small"
 }) {

    return(
       <div className={`textInput${
             size=="medium"? " textInput--md":""
          }${
             size=="large"? " textInput--lg":""
          }`}>
          {label && 
             <label 
                htmlFor={id} 
                className={required? "required-label":""}>
                {label}
             </label>}
            <div className="helper-message">{message}</div>
            <input 
               type={type} 
               required={required}
               id={id}
               name={name}
               onChange={handleChange}
               maxLength={maxLength}
               placeholder={placeholder}
               defaultValue={defaultValue}
               className={defaultValue? "input--notempty":""}
            />
            <div className="validation-message">{validationMessage}</div>
       </div>
    )
 }