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
import {UserProvider, UserContext} from "./context/user-context"

import PrivateRoute from "./router/private-route"

import Sidebar from "./components/_sidebar"

import Home from "./views/home"
import Login from "./views/login"
import Logout from "./views/logout"
import Register from "./views/register"
import Explore from "./views/explore"
import Location from "./views/location"
import AddLocation from "./views/add-location"
import Error404 from "./views/error404"

import "../scss/theme.scss"

const App = () => {
    const [isMobile, setIsMobile] = useContext(UIContext)
    const [auth, setAuth] = useContext(UserContext)

    const resize = () => {
        if(window.innerWidth <= 968) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resize)

        console.log("Auth", auth.token)

        fetch("http://127.0.0.1:8000/api/auth/user/", {
            headers: {
                "Authorization": `Token ${auth.token}`
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setAuth({
                ...auth,
                isAuthenticated: json["id"] != null,
                user: json["id"] != null? json : null,
            })
        })
        .catch(err => console.log(err))

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])
    
    return(
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register} />
                        <Route path="/logout" component={Logout}/>
                        <Route path="/explore" component={Explore}/>
                        <Route path="/add" component={AddLocation} />
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
<UserProvider>
<LocationProvider>
    <App />
</LocationProvider>
</UserProvider>
</UIProvider>
</React.StrictMode>,
document.getElementById("root"))