import React, {useContext} from "react"
import {Link} from "react-router-dom"

import "../../fontawesome/library"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {UIContext} from "../../context/UIContext"
import {UserContext} from "../../context/UserContext"

import LogoFull from "../../assets/nav-main-logo.svg"
import LogoMini from "../../assets/nav-main-logo-mini.svg"

import "../../styles/partials.scss" 

const SidebarLink = ({
    href,
    icon,
    children,
}) => {
    
    return(
        <div className="sidebar-link-container">
            <Link to={href}>
                {icon}
                <div className="sidebar-link">
                    <span>{children}</span>
                </div>
            </Link>
        </div>
    )
}

export default function Sidebar() {
    const [isMobile, setIsMobile] = useContext(UIContext)
    const [auth, setAuth] = useContext(UserContext)

    const homeIcon = <FontAwesomeIcon icon="home" className="sidebar-icon" />
    const signinIcon = <FontAwesomeIcon icon="head-side-mask" className="sidebar-icon" />
    const signoutIcon = <FontAwesomeIcon icon="sign-out-alt" className="sidebar-icon" />
    const addIcon = <FontAwesomeIcon icon="plus-square" className="sidebar-icon" />
    const exploreIcon = <FontAwesomeIcon icon="search-location" className="sidebar-icon" />

    return(
        <div className={isMobile
        ? "sidebar-container--mini" 
        : "sidebar-container--full"}>
            <nav className="sidebar">
                <div className="sidebar-logo">
                    <a href="/">
                    <img src={isMobile
                        ? LogoMini
                        : LogoFull}/>
                    </a>
                </div>
                <SidebarLink href="/" children={"Home"} icon={homeIcon} />

                {!auth.isAuthenticated && <SidebarLink href="/login" children={"Sign In"} icon={signinIcon} />}

                {auth.isAuthenticated && <SidebarLink href="/add" children={"Add Location"} icon={addIcon} />}

                <SidebarLink href="/explore" children={"Explore"} icon={exploreIcon} />

                {auth.isAuthenticated && <SidebarLink href="/logout" children={"Sign Out"} icon={signoutIcon} />}
                
            </nav>
        </div>
    )
}