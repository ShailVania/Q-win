import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../../../hey/qwin/src/config/helper"
import { firestoreV9 } from "../../../../hey/qwin/src/config/IntialiseFirebase"
import { AppDispatch } from "../../../../hey/qwin/src/store/store"
import { UserDetails } from "../../../../hey/qwin/src/layouts/profile/profileSlice"

export interface Dashboard {
  users: UserDetails[]
}

export const initialDashboard: Dashboard = {
  users: [],
}

export const getAllUsers = () => async (dispath: AppDispatch) => {
  try {
    const userRef = collection(firestoreV9, FIREBASE_COLLECTIONS.users)

    const users: Dashboard["users"] = []
    const snapShot = await getDocs(userRef)
    //
    snapShot.forEach((doc) => {
      const { createdAt, ...user } = doc.data()
      users.push((user as unknown) as UserDetails)
    })
    dispath(storeAllUsers(users))
  } catch (error) {}
}

export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: initialDashboard,
  reducers: {
    storeAllUsers: (state, action: PayloadAction<Dashboard["users"]>) => {
      if (action.payload) state.users = action.payload
      return state
    },
  },
})

export default dashboardSlice.reducer

const { storeAllUsers } = dashboardSlice.actions
