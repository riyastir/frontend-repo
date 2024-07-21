"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UpdateButton from "../components/UpdateButton"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout } from "../apis/userApi"
import { Box, Button, Typography } from "@mui/material"
import { reset } from "../store/updateSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"

const MainPage = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const dispatch = useDispatch<AppDispatch>()

  const handleGotoLogin = () => {
    router.push("/login")
  }

  const handleLogout = async () => {
    await logout()
    dispatch(reset())
    router.push("/login")
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      {user ? (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" onClick={handleGotoLogin}>
          Go to Login Page
        </Button>
      )}
      <UpdateButton />
    </Box>
  )
}

export default MainPage
