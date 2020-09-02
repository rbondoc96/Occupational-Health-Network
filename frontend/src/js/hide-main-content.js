document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar__wrapper")
    const footer = document.querySelector(".content-footer")

    document.body.removeChild(sidebar)
    document.body.removeChild(footer)
})