import React, {useState, useRef, useEffect} from "react"

import Button from "../button"

import "../../../../scss/components/forms/subform.scss"

export function SubformEntry({
    serialID,
    name,
    value,
    handleClick,
    ...rest
 }) {
    return(
       <div className="subform-entry" onClick={handleClick} data-id={serialID}>
          <input type="hidden" name={name} value={value} />
          {rest.line1 && <div className="subform-entry-line1">
             {rest.line1}
          </div>}
          {rest.line2 && <div className="subform-entry-line2">
             {rest.line2}
          </div>}
          {rest.line3 && <div className="subform-entry-line3">
             {rest.line3}
          </div>}
       </div>
    )
 }
 
export default function Subform({
   title,
   children,
   subentryGenerator,
   listselectDetective,
   addToContext,
   removeFromContext,
   subentries,
}) {
   const formRef = useRef(null)
   const toolbarRef = useRef(null)
   const contentRef = useRef(null)
   
   const [selected, setSelected] = useState(null)
   
   const handleSubentryClick = event => {
      if(selected) {
         selected.style.backgroundColor = "#FFF"
         selected.style.color = "rgb(68, 68, 68)"
      }
      event.currentTarget.style.backgroundColor = "rgb(47, 145, 211)"
      event.currentTarget.style.color = "#FFF"
      
      setSelected(event.currentTarget)
   }   
   
   const addSubentry = event => {
      const id = Date.now() 
      const inputs = formRef.current.querySelectorAll("input:not([type='checkbox'])")
      const selects = formRef.current.querySelectorAll("select")
      const listSelects = formRef.current.querySelectorAll(".listSelect")
      
      let subentry = {
         key: id
      }
      for(let input of inputs) {
         let key = input.id.split("-")[1]
         subentry[key] = input.value
      }
      for(let select of selects) {
         let key = select.id.split("-")[1]
         subentry[key] = select.value
      }
      for(let listSelect of listSelects) {
         let key = listSelect.id.split("-")[1]
         let inputs = listSelect.querySelectorAll("input[type='checkbox']:checked")
         let list =[]
         for(let input of inputs) {
            list.push(listselectDetective(input))
         }
         subentry[key] = list
      }

      addToContext(subentry)
   }
   const removeSubentry = event => {
      if(selected) {
         removeFromContext(selected)
      }
   }

   const handleToolbarClick = event => {
   if(contentRef.current.style.display != "none") {
      contentRef.current.style.display = "none"
   } else {
      contentRef.current.style.display = "block"
   }
   }

   useEffect(() => {
      toolbarRef.current.addEventListener("click", handleToolbarClick)

      return function() {
         toolbarRef.current.removeEventListener("click", handleToolbarClick)
      }
   }, [])
   
   return(
      <div className="subform-container">
         <div className="subform-toolbar" ref={toolbarRef}>
            <h3 className="subform-title">
               {title}      
            </h3>
         </div>
         <div className="subform-content" ref={contentRef}>
            <div className="subform" ref={formRef}>
               {children}
               <Button 
               secondary
                  onClick={addSubentry}
                  children={"Add Entry"}
                  />
            </div>
            <div className="subform-entries">
               <div className="subform-entries-box">
                  {subentries && subentries.map(subentry => {
                     let elem = subentryGenerator(subentry)
                     
                     return React.cloneElement(
                        elem,
                        {
                           handleClick: handleSubentryClick,
                           value: JSON.stringify(...subentries)
                        }
                     )
                  })}
               </div>
               <Button
               secondary 
                  onClick={removeSubentry}
                  children={"Remove Selected Entry"}
                  />
            </div>
         </div>
      </div>
   )
}