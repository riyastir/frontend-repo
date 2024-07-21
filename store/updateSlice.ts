import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit"
import { updateData, updateUserData } from "./actions"

interface UpdateState {
  loading: boolean
  success: boolean
  error: string | null
  data: any
}

const initialState: UpdateState = {
  loading: false,
  success: false,
  error: null,
  data: null,
}

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.success = false
      state.error = null
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateData.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
        state.data = null
      })
      .addCase(updateData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.success = true
        state.data = action.payload
        state.error = null
      })

      .addCase(updateUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
  },
})

export const { reset } = updateSlice.actions

export default updateSlice.reducer
