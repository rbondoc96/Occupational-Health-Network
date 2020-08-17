import "../scss/modals.scss"

class Modal {
    constructor(toggle, header, content, footer) {
        this.toggle = toggle
        this.root = toggle.nextElementSibling
        this.header = header
        this.content = content
        this.footer = footer

        this.toggle.addEventListener("click", this.toggleView.bind(this, event))

        console.log(this)
    }

    toggleView(event) {

    }
}

export default Modal