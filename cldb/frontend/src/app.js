// For async await functions
import regeneratorRuntime from "regenerator-runtime"

// React
import React, {useContext, useEffect} from "react"
import ReactDOM from "react-dom"

// React Router and related components
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom"
import PrivateRoute from "./components/router/PrivateRoute"
import ScrollToTop from "./components/router/ScrollToTop"

// Context Providers
import {LocationProvider} from "./context/LocationContext"
import {LocationFormProvider} from "./context/LocationFormContext"
 
// Contexts
import {UIContext} from "./context/UIContext"
import {UserContext} from "./context/UserContext"

// Partials
import Sidebar from "./components/partials/_Sidebar"
import Footer from "./components/partials/_Footer"

// Pages
import Home from "./pages/Home"
import Login from "./pages/Login" 
import Logout from "./pages/Logout"
import Register from "./pages/Register"
import AddLocation from "./pages/AddLocation"
import Location from "./pages/Location"
import Explore from "./pages/Explore"
import Error404 from "./pages/Error404" 

// Global Styles
import "./styles/theme.scss"

export default function App() {
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

        if(auth.token) {
            fetch("/api/auth/user/", {
                headers: {
                    "Authorization": `Token ${auth.token}`
                }
            })
            .then(res => res.json())
            .then(json => {
                setAuth({
                    ...auth,
                    isAuthenticated: json["id"] != null,
                    user: json["id"] != null? json : null,
                })
            })
            .catch(err => console.log(err))
        }

        return () => { 
            window.removeEventListener("resize", resize)
        }
    }, [])

    return(
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <ScrollToTop />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register} />
                        <Route path="/logout" component={Logout}/>
                        <Route path="/explore" component={Explore}/>
                        
                        <LocationFormProvider>
                            <Route path="/add" component={AddLocation} />
                            <Route path="/location/:slug" component={Location} />
                        </LocationFormProvider>

                        <Route path="*" component={Error404}/> 
                    </Switch> 
                </div>
                <Footer />
            </div>
        </Router>
    )  
}