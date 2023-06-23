import { useEffect, useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LOCAL_STORAGE } from "../../../hey/qwin/src/config/localStorage"
import Login from "../../../hey/qwin/src/layouts/login/Login"
import { getUserFromFirestore, getUserLocal } from "../../../hey/qwin/src/layouts/login/loginSlice"
import ManageEvents from "../../../hey/qwin/src/layouts/manageEvent/ManageEvents"
import Profile from "../../../hey/qwin/src/layouts/profile/Profile"
import UserHomePage from "../../../hey/qwin/src/layouts/userHomePage/UserHomePage"
import Dashboard from "../../../hey/qwin/src/layouts/dashboard/Dashboard"
import Test from "../../../hey/qwin/src/layouts/dashboard/Test"
import CreateProjectForm from "../../../hey/qwin/src/layouts/DemoDay/CreateProjectForm"
import ChooseProjects from "../../../hey/qwin/src/layouts/DemoDay/ChooseProjects"
import DemodaypageComponant from "../../../hey/qwin/src/layouts/DemodayPage/DemodaypageComponant"
import QrScan from "../../../hey/qwin/src/layouts/verification/QRScanner"
import Verification from "../../../hey/qwin/src/layouts/verification/Verification"
import { useAppDispatch } from "../../../hey/qwin/src/store/store"
import { log } from "console"
import { USER_ROLES } from "../../../hey/qwin/src/config/helper"
import CreateDemoDayEvent from "../../../hey/qwin/src/layouts/DemoDay/CreateDemoDayEvent"
// import Dashboard from "../components/dashboard/Dashboard";
// import NotProtectedRoute from "./NotProtectedRoute";
// import EventDetail from "../components/event/EventDetail";
// import User from "../components/user/User";
// import ProtectedRoute from "./ProtectedRoute";
// import People from "../components/people/People";
// import CreateEditEvent from "../components/event/CreateEditEvent";
// import Settings from "../components/settings/Settings";
// import Authenticate from "../components/auth/Authenticate";

const Router = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = LOCAL_STORAGE.getUser()
    if (user) dispatch(getUserFromFirestore(user.userID))
    dispatch(getUserLocal())
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") window.location.href = "/login"
    } else if (user && !user.studentID) {
      if (window.location.pathname !== "/profile") window.location.href = "/profile"
    }

    return () => {}
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<ManageEvents />} />
        <Route path="/events/:id?" element={<ManageEvents />} />
        <Route path="/start-verification" element={<Verification />} />
        <Route path="/qr-scanner" element={<QrScan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dempday-create-project" element={<CreateProjectForm/>}/>
        <Route path="/demoday-choose-project" element={<ChooseProjects/>}/>
        <Route path="/demoday-page" element={<DemodaypageComponant/>}/>
        <Route path="/create-demo-day-event/:id?" element={<CreateDemoDayEvent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
