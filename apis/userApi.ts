import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBcv2WGfX9FKAsuRp1nmf_iKkqB-Xzpszk",
  authDomain: "ebuddy-interview-2024.firebaseapp.com",
  projectId: "ebuddy-interview-2024",
  storageBucket: "ebuddy-interview-2024.appspot.com",
  messagingSenderId: "740821614966",
  appId: "1:740821614966:web:3851950cbef3c4654bba57",
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export { auth }

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
  return signOut(auth)
}

export const fetchData = async () => {
  const token = await auth.currentUser?.getIdToken()
  const response = await fetch("http://localhost:3000/api/users/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Unauthorized")
  }

  return response.json()
}

export const updateUser = async (
  id: string,
  userData: Partial<{
    first_name: string
    last_name: string
    phone: number
    email: string
  }>
) => {
  const token = await auth.currentUser?.getIdToken()
  const response = await fetch(`http://localhost:3000/api/users/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: userData }),
  })

  if (!response.ok) {
    throw new Error("Failed to update user")
  }

  return response.json()
}
