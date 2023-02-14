import { createSlice } from "@reduxjs/toolkit"

export interface UserDetails {
  name: string
  email: string
  program: string
  mobileNo: string
  userID: string
  studentID: string
  user_events: {
    eventID: string
    title: string
    date: string
  }[]
  events_attended: {
    eventID: string
  }[]
}

export const initialUserProfile: UserDetails = {
  name: "",
  email: "",
  userID: "",
  mobileNo: "",
  program: "MAC Summer 22",
  studentID: "",
  user_events: [],
  events_attended: [],
}
