import React, {useEffect, useRef} from "react"

const SelectOption = ({
    id,
    name,
    value,
    isMultiple,
    disabled=false,
    className,
    children
}) => {

    const optRef = useRef(null)

    const handleClick = event => {
        event.preventDefault()
        optRef.current.selected = !optRef.current.selected
    }
    
    useEffect(() => {
        if(isMultiple) {
            optRef.current.addEventListener("mousedown", handleClick)

            return function() {
                optRef.current.removeEventListener("mousedown", handleClick)
            }
        }
    }, [])

    return (
        <option 
        ref={optRef}
        value={value} 
        className={`select-input-option ${className? className:""}`}
        disabled={disabled}>
            {children}
        </option>
    )
}

export default function SelectInput({
    id,
    name,
    label,
    placeholder,
    options,
    optionObjs,
    message,
    required=false,
    multiple=false,
    className,
}) {

    return(
        <div className={`select-input ${className? className:""}`}>
            {label && <label name={id}>{label}</label>}
            <select id={id} name={name? name : id} required={required} multiple={multiple}>
                <SelectOption 
                value={""} 
                className={"option--placeholder"}
                children={placeholder} 
                isMultiple={multiple? true:false} 
                disabled/>
                {options && options.map((opt, idx) => {
                    return(<SelectOption 
                        key={idx}
                        value={opt}
                        children={opt}
                        isMultiple={multiple? true:false}
                    />)
                })}
                {optionObjs && optionObjs.map(obj => {
                    return(<SelectOption 
                        key={obj["id"]}
                        value={obj["id"]}
                        children={obj["name"]}
                    />)
                })}
            </select>
            <p>{message}</p>
        </div>
    )
}