import React, {useEffect, useContext} from "react"
import {
    Switch,
    Route,
    Redirect,
    useParams,
    useRouteMatch
} from "react-router-dom"

import {LocationProvider, LocationContext} from "../context/location-context"

import ServiceSection from "../components/location/_service-section"
import ServiceHoursSection from "../components/location/_service-hours-section"
import ContactsSection from "../components/location/_contacts-section"
import CommentsSection from "../components/location/_comments-section"

import "../../scss/views/location.scss"

export default function Location({

}) {
    const [info, setInfo] = useContext(LocationContext)
    const {slug} = useParams()

    useEffect(() => {
        async function fetchData() {
            const json = await fetch(`http://127.0.0.1:8000/api/locations/${slug}`)
            .then(res => res.json())
            .then(json => {
                setInfo({
                    id: json["id"],
                    slug: json["slug"],
                    category: json["location_category"]["name"],
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
                    services: json["service_list"].map(serviceObj => {
                        return {
                            id: serviceObj["id"],
                            name: serviceObj["name"],
                            category: serviceObj["service_category"]["name"],
                        }
                    }),
                    serviceCategories: json["service_list"].map(serviceObj => {
                        return serviceObj["service_category"]
                    }).filter((value, index, self) => {
                        return self.indexOf(value) === index
                    }),
                    serviceHours: json["service_hours"].map(serviceHourObj => {
                        return {
                            id: serviceHourObj["id"],
                            name: serviceHourObj["name"],
                            startTime: serviceHourObj["start_time"],
                            endTime: serviceHourObj["end_time"],
                            days: serviceHourObj["days"].map(day => {
                                return day.name
                            })
                        }
                    }),
                    businessHours: json["op_hours"].map(businessHour => {
                        return {
                            id: businessHour["id"],
                            day: businessHour["day"]["name"],
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
                    paymentMethods: json["auth_method_list"].map(paymentMethod => {
                        return {
                            id: paymentMethod["id"],
                            name: paymentMethod["name"]
                        }
                    }),
                })
                return json
            })
            console.log(json)
        }
        console.log("fetching data")
        fetchData()
    }, [slug, setInfo])

    return(
        <div className="container location">
            <div className="location-header">
                <h1>{info.name}</h1>
                <h3>{info.branchName}</h3>
            </div>
            <div className="location-category">
                <span>{info.category}</span>
            </div>
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
    )
}