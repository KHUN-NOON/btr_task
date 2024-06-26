import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../contexts/AuthContext"

const PublicRoutes = ({ children }) => {
    const location = useLocation()

    const auth = useAuth()

    if ( auth.isAuth ) {
        return <Navigate to="/chat" replace state={{ from: location }}/>
    }

    return children ? children : <Outlet/>
}

export default PublicRoutes