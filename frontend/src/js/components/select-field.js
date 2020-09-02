var template = document.createElement("template")
template.innerHTML = `
    <style>
    :host {
        display: block;
    }
    ::slotted(label) {
        font-weight: 700;
        font-size: 14px;
    }
    ::slotted(select) {
        padding: 0.4em 0.6em !important;
        border-width: 1px;
        border-radius: 0.3em;
    }    
    ::slotted(select[multiple]) {
        padding: 0 !important;
    }
    ::slotted(select:focus) {
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
        justify-content: space-between;
    }
    .err-message {
        display: none;
        color: red;
    }
    .description, .err-message {
        margin-top: 2px;
        font-size: 0.8rem;
    }
    </style>
    <div class="wrapper">
        <div class="content">
            <div class="header">
                <slot name="label">
                    <label>Field Label</label>
                </slot>
            </div>
            <slot name="select">
                <select>
                    <option value="">None</option>
                </select>
            </slot>
        </div>
        <p class="description">
            <slot name="info"></slot>
        </p>
        <p class="err-message"></p>
    </div>    
`

class SelectField extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.select = this.querySelector("select")
        this.label = this.querySelector("label")
        this.description = this.shadowRoot.querySelector(".description")
        this.errorMessage = this.shadowRoot.querySelector(".err-message")
        this.isMultipleMode = this.select.hasAttribute("multiple")
        this.isRequired = this.select.hasAttribute("required")

        if(this.isRequired){
            this.label.setAttribute("class", "required")
        }

        this.handleChange = this.handleChange.bind(this)
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

    handleChange(event) {
        let isNotBlank = true

        if(this.isRequired) {
            if(event.target.value == "") {
                this.errorMessage.textContent = "Required"
                isNotBlank = false
            }
        }

        if(isNotBlank) {
            this.hideError()
            this.select.setAttribute("data-status", "valid")
            this.select.style.borderColor = "#000"
        } else {
            this.hideDescription()
            this.select.setAttribute("data-status", "invalid")
            this.select.style.borderColor = "#FF0000"
        }
    }

    addOption(text, value) {
        let option = document.createElement("option")
        option.setAttribute("value", value)
        option.textContent = text

        this.select.appendChild(option)
    }

    connectedCallback(){
        if(this.select.isConnected)
            this.select.addEventListener("change", this.handleChange)

    }
    disconnectedCallback(){
        this.select.removeEventListener("change", this.handleChange)
    }
}
window.customElements.define("select-field", SelectField)