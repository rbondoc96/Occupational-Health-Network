import regeneratorRuntime from "regenerator-runtime"

import React, {useContext, useEffect} from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom"

import {UIProvider, UIContext} from "./context/ui-context"
import {LocationProvider} from "./context/location-context"

import Sidebar from "./components/_sidebar"

import Home from "./views/home"
import Explore from "./views/explore"
import Location from "./views/location"
import Error404 from "./views/error404"

import "../scss/theme.scss"

const App = () => {
    const [isMobile, setIsMobile] = useContext(UIContext)

    const resize = () => {
        if(window.innerWidth <= 960) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
        }
    })
    
    return(
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/explore" component={Explore}/>
                        <Route path="/location/:slug" component={Location} />
                        <Route path="*" component={Error404}/>
                    </Switch> 
                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(
<React.StrictMode>
<UIProvider>
<LocationProvider>
    <App />
</LocationProvider>
</UIProvider>
</React.StrictMode>,
document.getElementById("root"))