import React from "react"

import "../../../../scss/components/forms/inputs.scss"

export default function SelectInput({
    label,
    id,
    name,
    required,
    options,
    optionObjs,
    handleChange,
    placeholder,
    message,
    validationMessage,
    size="small"
 }) {
    
    return(
       <div className={`selectInput${
             size=="medium"? " selectInput--md":""
          }${
             size=="large"? " selectInput--lg":""
          }`}>
          {label && 
             <label 
                htmlFor={id} 
                className={required? "required-label":""}>
                {label}
             </label>}
         <div className="helper-message">{message}</div>
         <select
         required
         id={id}
         name={name}
         onChange={handleChange}            
         >
         {placeholder && <option value="" selected disabled>{placeholder}</option>}
         {options && options.map((opt, idx) => {
            return(<option 
                     key={idx}
                     value={opt}
                     children={opt}
                     />)
         })}
         {optionObjs && optionObjs.map(obj => {
            return(<option 
                     key={obj["id"]}
                     value={obj["id"]}
                     children={obj["name"]}
                     />)
         })}
         </select>
         <div className="validation-message">{validationMessage}</div>
       </div>
    )
 }