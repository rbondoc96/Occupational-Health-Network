import React from "react"

import CheckboxInput from "./CheckboxInput"

import "../../../../scss/components/forms/inputs.scss"

export default function ListSelectInput({
    label,
    id,
    name,
    required,
    options,
    optionObjs,
    handleChange,
    width=500,
    size="small"
 }) {
    
    return(
       <div className="listSelectInput">
          {label && 
             <label 
                className={required? "required-label":""}>
                {label}
             </label>}
          <div className="listSelect" id={id}>
             {
                optionObjs && optionObjs.map(obj => {
                   return <CheckboxInput 
                             name={name}
                             label={obj["name"]}
                             value={obj["id"]}
                             handleChange={handleChange}
                             />
                })
             }
          </div>
       </div>
    )
 }