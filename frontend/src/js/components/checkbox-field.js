var template = document.createElement("template")
template.innerHTML = `
    <style>
    .wrapper {
        margin: 10px 0;
    }
    .content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    ::slotted(label) {
        position: relative;
        bottom: -1px;
        margin-left: 10px !important;
    }
    </style>
    <div class="wrapper">
        <div class="content">
            <slot name="input"><input type="checkbox"></slot>
            <slot name="label"><label>Checkbox Label</label></slot>
        </div>
    </div>
`

class CheckboxField extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.input = this.querySelector("input")
        this.label = this.shadowRoot.querySelector("label")

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event.target.checked)
    }

    connectedCallback() {
        if(this.input.isConnected) {
            this.input.addEventListener("change", this.handleChange)
        }
    }
    disconnectedCallback() {
        this.input.removeEventListener("change", this.handleChange)
    }
}
window.customElements.define("checkbox-field", CheckboxField)

