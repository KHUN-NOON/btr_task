import { useLocation } from "react-router-dom"
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../contexts/AuthContext"

const PrivateRoutes = ({ children }) => {
    const location = useLocation()

    const auth = useAuth()

    if ( !auth.isAuth ) {
        return <Navigate to="/" replace state={{ from: location }}/>
    }

    return children ? children : <Outlet/>
}

export default PrivateRoutes