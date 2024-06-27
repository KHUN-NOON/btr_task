import { combineReducers } from "@reduxjs/toolkit"
import messageSlice from "./slices/messageSlice"

const rootReducer = combineReducers({
    messages: messageSlice.reducer
})

export default rootReducer