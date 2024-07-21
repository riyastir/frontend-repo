import { combineReducers } from "@reduxjs/toolkit"
import updateReducer from "./updateSlice"

const rootReducer = combineReducers({
  update: updateReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
