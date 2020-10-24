import React, {useContext} from "react"
import {Route, Redirect} from "react-router-dom"

import {UserContext} from "../../context/UserContext"

export default function PrivateRoute ({
    component: Component,
    ...rest
}) {
    
    const [auth, setAuth] = useContext(UserContext)

    return <Route 
        {...rest}
        render={props => {
            if(auth.isLoading) {
                return <h2>Loading...</h2>
            } else if(auth.isAuthenticated) {
                return <Component {...props} />
            } else {
                return <Redirect to="/login" />
            }
         }
        }
    />
}