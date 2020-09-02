var template = document.createElement("template")
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        p {
            margin: 0;
            font-size: 0.8rem;
        }
        ::slotted(label) {
            font-weight: 700;
            font-size: 14px;
        }
        ::slotted(textarea) {
            padding: 0.4em 0.6em;
            min-height: 150px;
            resize: vertical;
        
            font-family: "Varta", sans-serif;
        }        
        ::slotted(input), ::slotted(textarea) {
            padding: 0.4em 0.6em !important;
            border-width: 1px;
            border-radius: 0.3em;
        }
        ::slotted(input:focus), ::slotted(textarea:focus) {
            outline: none;
            border: 1px solid #1B8FFA !important;
        }
        ::slotted(.required):after {
            content: " *";
            color: #ff0000;
        }

        .wrapper {
            margin: 15px 0;
        }

        .content {
            display: flex;
            flex-direction: column;
        }

        .header {
            display: flex;
            flex-direction: column;
        }
        .description, .err-message {
            margin-top: 2px;
        }
        .err-message {
            display: none;
            color: red;
        }
    </style>
    <div class="wrapper">
        <div class="content">
            <div class="header">
                <slot name="label">
                    <label>Field Label</label>
                </slot>
            </div>
            <slot name="input">
                <input type="text">
            </slot>
        </div>
        <p class="description">
            <slot name="info"></slot>
        </p>
        <p class="err-message"></p>
    </div>
`

class TextField extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }

    constructor(){
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.input = this.querySelector("input") || this.querySelector("textarea")
        this.isRequired = this.input.hasAttribute("required")
        this.validator = this.getAttribute("validator")
        this.limit = this.getAttribute("char-limit")

        this.label = this.querySelector("label")
        this.description = this.shadowRoot.querySelector(".description")
        this.errorMessage = this.shadowRoot.querySelector(".err-message")

        if(this.isRequired)
            this.label.setAttribute("class", "required")

        this.validateInput = this.validateInput.bind(this)
    }

    hideDescription() {
        this.description.style.display = "none"
        this.errorMessage.style.display = "block"
    }
    hideError() {
        this.description.style.display = "block"
        this.errorMessage.style.display = "none"
    }

    setErrorMessage(message) {
        this.errorMessage.textContent = message
    }

    validateInput(event) {
        let value = event.target.value
        let valueLength = value.length
        let isNotEmpty = true, 
        isWithinLimits = true, 
        isDataValid = true

        if(this.limit != "" && this.limit != null) {
            if(valueLength >= this.limit) {
                this.errorMessage.textContent = `-${valueLength-this.limit} characters remaining`
            } 
            isWithinLimits = !(valueLength > this.limit)
        }
        if(this.validator != "" && this.validator != null) {
            if(this.validator == "phone") {
                // (123) 456-6780 or 123-234-2343 
                let regex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)
                    this.errorMessage.textContent = "Invalid phone"
            }
            else if(this.validator == "zipcode") {
                // Regex allows for 5 digit or 9 digit mailing zip codes
                let regex = /^((\d{5})(-\d{4})?)$/

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)    
                    this.errorMessage.textContent = "Invalid zipcode"
            }
            else if(this.validator == "phone-ext") {
                // Regex for US phone numbers w/ optional 1-6 digit extension
                // (123) 456-6780 x123456 or 123-234-2343 x123456
                let regex = /^((((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4})( x\d{1,6})?)$/

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)
                    this.errorMessage.textContent = "Invalid phone"
            } else if(this.validator == "url") {
                let regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)
                    this.errorMessage.textContent = "Invalid URL"
            } else if(this.validator == "time") {
                let regex = /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)
                    this.errorMessage.textContent = "Invalid time format"
            } else if(this.validator == "email") {
                let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

                isDataValid = regex.test(value) || value == ""
                if(!isDataValid)
                    this.errorMessage.textContent = "Invalid email address"                
            }
        } 
        if(this.isRequired) {
            if(valueLength == 0) {
                this.errorMessage.textContent = "Required"
            } 
            isNotEmpty = valueLength > 0

        }        
    
        if(isNotEmpty && isWithinLimits && isDataValid) {
            this.hideError()
            this.input.setAttribute("data-status", "valid")
            this.input.style.borderColor = "#000"
        } else {
            this.hideDescription()
            this.input.setAttribute("data-status", "invalid")
            this.input.style.borderColor = "#FF0000"
        }

        this.setAttribute("state", value)
    }

    connectedCallback(){
        if(this.input.isConnected) {
            this.input.addEventListener("keyup", this.validateInput)
        } 
    }

    disconnectedCallback(){
        this.input.removeEventListener("keyup", this.validateInput)
    }

    attributeChangedCallback(attributeName, oldValue, newValue){
        
    }
}
window.customElements.define("text-field", TextField)