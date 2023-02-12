import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { toastr } from "react-redux-toastr"
import { firestore, firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"

export interface EventDetails {
  id: string
  title: string
  description: string
  address: string
  date: string
}

export const initialEventDetails: EventDetails = {
  id: "",
  title: "",
  description: "",
  address: "",
  date: "",
}

export const getEventFunction = (id: string) => async (dispatch: AppDispatch) => {
  const eventRef = doc(firestoreV9, "events", id)
  return getDoc(eventRef)
    .then((res) => {
      const data = res.data()
      if (data) {
        const event: EventDetails = {
          title: data.title,
          description: data.description,
          address: data.address,
          date: data.date,
          id: res.id,
        }
        dispatch(storeEvent(event))
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const manageEventSlice = createSlice({
  name: "Manage Events",
  initialState: initialEventDetails,
  reducers: {
    storeEvent: (state, action: PayloadAction<EventDetails>) => {
      return { ...action.payload }
    },
    createEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      setDoc(doc(collection(firestoreV9, "events")), action.payload)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Created`, "Event Created Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    deleteEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, "events", action.payload.id)
      deleteDoc(eventRef)
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Deleted`, "Event Deleted Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
    getEvent: (state, action: PayloadAction<{ id: string }>) => {},
    updateEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      const eventRef = doc(firestoreV9, "events", action.payload.id)
      setDoc(eventRef, action.payload, { merge: true })
        .then((res) => {
          console.log(res)
          toastr.success(`${action.payload.title} Updated`, "Event Updated Successfully")
          window.location.href = "/"
        })
        .catch((error) => {})
    },
  },
})

export const { createEvent, deleteEvent, getEvent, updateEvent, storeEvent } = manageEventSlice.actions

export default manageEventSlice.reducer
