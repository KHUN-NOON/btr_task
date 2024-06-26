import { RouterProvider } from "react-router-dom"
import AppRoute from "./router/AppRoute"
import { AuthProvider } from "./contexts/AuthContext"
import { initDB } from "react-indexed-db-hook"
import { DBConfig } from "./db/DBConfig"
import { CssBaseline } from "@mui/material"
import { Provider } from "react-redux"
import store from "./redux/store"

initDB(DBConfig)

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CssBaseline/>
        <RouterProvider router={AppRoute}/>
      </AuthProvider>
    </Provider>
  )
}

export default App
