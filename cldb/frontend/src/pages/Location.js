import React, {useEffect, useContext} from "react"
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect,
    useParams,
    useRouteMatch
} from "react-router-dom"

import {UserContext} from "../context/UserContext"
import {LocationContext} from "../context/LocationContext"

import ServiceSection from "../components/location/_ServiceSection"
import ServiceHoursSection from "../components/location/_ServiceHoursSection"
import ContactsSection from "../components/location/_ContactsSection"
import CommentsSection from "../components/location/_CommentsSection"

import LocationForm from "../components/forms/_LocationForm"

import Button from "../components/inputs/Button"

import "../styles/location.scss"

export default function Location({

}) {
    const [auth, setAuth] = useContext(UserContext)
    const [info, setInfo] = useContext(LocationContext)
    const {slug} = useParams()

    const {path, url} = useRouteMatch()

    useEffect(() => {
        async function fetchData() {
            const json = await fetch(`/api/locations/${slug}`)
            .then(res => res.json())
            .then(json => {
                setInfo({
                    id: json["id"],
                    slug: json["slug"],
                    category: json["location_category"],
                    name: json["name"],
                    branchName: json["branch_name"],
                    street1: json["street_line_1"],
                    street2: json["street_line_2"],
                    city: json["city"],
                    state: json["state"],
                    zipcode: json["zipcode"],
                    phone: json["phone"],
                    fax: json["fax"],
                    isCallable: json["is_phone_callable"],
                    website: json["website"],
                    comments: json["comments"],
                    services: json["service_list"],
                    serviceCategories: json["service_list"].map(service => {
                        return service["service_category"]
                    }).filter((value, index, self) => {
                        return self.indexOf(value) === index
                    }),
                    serviceHours: json["service_hours"].map(serviceHourObj => {
                        return {
                            id: serviceHourObj["id"],
                            name: serviceHourObj["name"],
                            startTime: serviceHourObj["start_time"],
                            endTime: serviceHourObj["end_time"],
                            days: serviceHourObj["days"]
                        }
                    }),
                    businessHours: json["op_hours"].map(businessHour => {
                        return {
                            id: businessHour["id"],
                            day: businessHour["day"],
                            startTime: businessHour["start_time"],
                            endTime: businessHour["end_time"],
                        }
                    }),
                    contacts: json["contacts"].map(contact => {
                        return {
                            id: contact["id"],
                            name: contact["name"],
                            title: contact["title"],
                            phone: contact["phone"],
                            email: contact["email"],
                        }
                    }),
                    paymentMethods: json["auth_method_list"],
                })
                return json
            })
            console.log(json)
        }
        console.log("fetching data")
        fetchData()
    }, [slug, setInfo])

    return(
        <Switch>
            <Route exact path={path} render={() =>
                <div className="container location">
                    <div className="location-header">
                        <h1>{info.name}</h1>
                        <h3>{info.branchName}</h3>              
                    </div>
                    <div className="location-category">
                        <span>{info.category.name}</span>
                    </div>
                    {
                        auth.isAuthenticated && <div className="location-edit-button">
                            <Link
                                to={`${url}update`}
                            >
                                <Button 
                                    id="edit-button"
                                    secondary
                                    children={"Edit Location Info"}
                                />
                            </Link>
                        </div>
                    }
                    <div className="location-infobar">
                        <div className="location-address">
                            <div>{info.street1}</div>
                            {info.street2 && <div>{info.street2}</div>}
                            <div>
                                <span>{info.city}</span>,
                                <span> {info.state}</span>
                                <span> {info.zipcode}</span>
                            </div>
                        </div>                  
                        <div className="location-contact">
                            <div className="location-phone">
                                <span className="location-label">Phone: </span>{info.phone}
                            </div>
                            {
                                info.fax && <div className="location-fax">
                                    <span className="location-label">Fax: </span>{info.fax}
                                </div>
                            }
                            {
                                info.website && <div className="location-website">
                                    <a href={info.website} target="_blank">Website</a>
                                </div>
                            }
                        </div>
                        {
                            info.businessHours && <div className="location-hours">
                                {info.businessHours.map(obj => {
                                    return(
                                        <div className="location-hour" key={obj["id"]}>
                                            <span className="location-label">{obj["day"]["name"]}: </span>
                                            <span>{obj["startTime"]} - {obj["endTime"]}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    {
                        info.paymentMethods && <div className="location-payments">
                            <span className="location-label">Payments Accepted Through: </span>
                            <span>{info.paymentMethods.map(obj => obj.name).join(", ")}</span>
                        </div>
                    }
                    <div className="location-main">
                        <div className="location-services">
                            {info.services && <ServiceSection />}
                        </div>
                        <div className="location-service-hours">
                            {info.serviceHours && <ServiceHoursSection />}
                        </div>
                        <div className="location-contacts">
                            {info.contacts && <ContactsSection />}
                        </div>
                        <div>
                            {info.comments && <CommentsSection />}
                        </div>
                    </div>
                </div>
            } />
            
            
            <Route path={`${path}/update`} render={() => {
                if(info.slug && window.location.href.includes(info.slug)) {
                    return(
                        <div className="container">
                            <LocationForm 
                                method="PATCH"
                                url={`/api/locations/${info.id}/`}
                                submitButtonText="Update Location"
                                header="Update Location Information"
                                initialValues={info} 
                            />
                        </div>
                    )
                } else {
                    return(
                        <Redirect to="/add" />
                    )
                }
            }} />
        </Switch>
    )
}