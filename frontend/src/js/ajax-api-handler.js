class AjaxApiHandler {
    constructor(url, method="GET") {
        this.url = url
        this.method = method
        this.xhr = new XMLHttpRequest()
        this.xhr.responseType = "json"

        this.xhr.open(method, this.url, true)
    }

    execute() {
        return new Promise((resolve, reject) => {
            // Set up any headers and body
            if(this.method == "POST" || this.method == "PATCH") {

            } else {

            }

            this.xhr.onload = function(event) {
                resolve(this.xhr)
            }.bind(this)
            this.xhr.onerror = function(event) {
                reject(this.xhr)
            }.bind(this)

            this.xhr.send()
        })
    }

    config(url, method) {
        this.url = url
        this.method = method

        this.xhr.open(method, this.url, true)
    }
}

export default AjaxApiHandler