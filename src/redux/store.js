import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { createStateSyncMiddleware } from "redux-state-sync"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(createStateSyncMiddleware({}))
    )
})

export default store