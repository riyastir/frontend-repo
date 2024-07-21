"use client"

import React, { useState, useEffect } from "react"
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateData, updateUserData } from "../store/actions"
import { RootState, AppDispatch } from "../store/store"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../apis/userApi"
import UserTable from "./UserTable"

const UpdateButton = () => {
  const [unauthorizedError, setUnauthorizedError] = useState<string | null>(
    null
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { loading, success, error, data } = useSelector(
    (state: RootState) => state.update
  )
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (success && !loading) {
      setOpenDialog(false)
    }
  }, [success, loading])

  const handleClick = () => {
    if (!user) {
      setUnauthorizedError("Unauthorized")
      return
    }
    setUnauthorizedError(null)
    dispatch(updateData())
  }

  const handleEditClick = (userData: any) => {
    setSelectedUser(userData)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedUser(null)
  }

  const handleSave = () => {
    if (selectedUser) {
      const { id, first_name, last_name, phone, email } = selectedUser
      const userData: Partial<{
        first_name: string
        last_name: string
        phone: number
        email: string
      }> = {}
      if (first_name) userData.first_name = first_name
      if (last_name) userData.last_name = last_name
      if (phone) userData.phone = phone
      if (email) userData.email = email
      dispatch(updateUserData({ id, userData }))
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button variant="contained" color="primary" onClick={handleClick}>
        Update Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {success && (
        <>
          <Typography>Update Successful!</Typography>
          <UserTable data={data} onEdit={handleEditClick} />
        </>
      )}
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
      {unauthorizedError && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {unauthorizedError}
        </Typography>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit the user details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={selectedUser?.first_name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, first_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={selectedUser?.last_name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, last_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={selectedUser?.phone || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, phone: e.target.value })
            }
          />
          {loading && <Typography>Updating...</Typography>}
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UpdateButton
