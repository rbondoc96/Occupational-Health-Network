import React from "react"
import ReactDOM from "react-dom"

import {UIProvider} from "./context/UIContext"
import {UserProvider} from "./context/UserContext"
import {LocationProvider} from "./context/LocationContext"

import App from "./app"

ReactDOM.render(
    <React.StrictMode>
        <UIProvider>
            <UserProvider>
                <LocationProvider>
                    <App />
                </LocationProvider>
            </UserProvider>
        </UIProvider>
    </React.StrictMode>,
    document.getElementById("root")
)