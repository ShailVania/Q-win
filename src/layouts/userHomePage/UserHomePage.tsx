import { useEffect, useState } from "react"
import { useAppSelector } from "../../../../hey/qwin/src/store/store"
import EventCard from "../../../../hey/qwin/src/layouts/eventsList/EventCard"
import EventList from "../../../../hey/qwin/src/layouts/eventsList/EventsList"
import NewHeader from "../../../../hey/qwin/src/layouts/header/NewHeader"

export default function UserHomePage() {
  const [selectedView, setSeletectedView] = useState<"event" | "myEvent">("event")
  const user = useAppSelector((state) => state.login)

  useEffect(() => {}, [])
  return (
    <div className="home-page-background">
      <div>
      <NewHeader />
      </div>
      {/* {isAdmin() ? null : (
        <div className="button-container">
          <button
            id={`upcoming-events-btn`}
            className={`${selectedView === "event" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("event")}
          >
            Events
          </button>
          <div className="separator"></div>
          <button
            id={`my-events-btn`}
            className={`${selectedView === "myEvent" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("myEvent")}
          >
            My Bookings
          </button>
        </div>
      )} */}

      {selectedView === "event" ? (
        <EventList />
      ) : (
        <div>
          {user.user_events ? (
            user.user_events.map((event) => (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <h1>No Registered Events</h1>
          )}
        </div>
      )}
    </div>
  )
}
