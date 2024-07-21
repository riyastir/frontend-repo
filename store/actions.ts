import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchData, updateUser } from "../apis/userApi"

export const updateData = createAsyncThunk(
  "update/data",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchData()
      return data
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      } else {
        return rejectWithValue("An unknown error occurred")
      }
    }
  }
)

export const updateUserData = createAsyncThunk(
  "update/user",
  async (
    {
      id,
      userData,
    }: {
      id: string
      userData: Partial<{
        first_name: string
        last_name: string
        phone: number
        email: string
      }>
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await updateUser(id, userData)
      await dispatch(updateData())
      return response
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      } else {
        return rejectWithValue("An unknown error occurred")
      }
    }
  }
)
