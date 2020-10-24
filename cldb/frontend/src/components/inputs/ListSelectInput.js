import React from "react"

import CheckboxInput from "./CheckboxInput"

import "../../styles/inputs.scss"

export default function ListSelectInput({
    label,
    id,
    name,
    required,
    options,
    optionObjs,
    defaultValues,
    handleChange,
    width=500,
    size="small"
 }) {

   const IDs = defaultValues? defaultValues.map(service => service.id) : null
    
    return(
       <div className="listSelectInput">
          {label && 
             <label 
                className={required? "required-label":""}>
                {label}
             </label>}
          <div className="listSelect" id={id}>
             {
                optionObjs && optionObjs.map((obj, idx) => {
                   return <CheckboxInput 
                             key={idx}
                             name={name}
                             label={obj["name"]}
                             value={obj["id"]}
                             handleChange={handleChange}
                             checked={IDs && IDs.includes(obj["id"])}
                             />
                })
             }
          </div>
       </div>
    )
 }