import React, { useEffect } from "react"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { checkIfAdmin } from "../../config/helper"
import Header from "../header/Header"
import "./userHomePage.css"

export default function UserHomePage() {
  useEffect(() => {}, [])
  return (
    <div>
      <Header />
      <div className="button-container">
        <button id="upcoming-events-btn">Events</button>
        <div className="separator"></div>
        <button id="my-events-btn">My Bookings</button>
      </div>

      <div id="event-list-container">
        <ul id="upcoming-events-list" className="event-list"></ul>

        <ul id="my-events-list" className="event-list"></ul>
      </div>
    </div>
  )
}
