import { createBrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import PublicRoutes from './PublicRoutes'
import LoginScreen from "../screens/LoginScreen"
import ChatScreen from "../screens/ChatScreen"

const AppRoute = createBrowserRouter([
    {
        element: <PublicRoutes/>,
        children: [
            {
                path: '/',
                element: <LoginScreen/>
            }
        ]
    },
    {
        element: <PrivateRoutes/>,
        children: [
            {
                path: '/chat',
                element: <ChatScreen/>
            }
        ]
    }
], { basename: '/' })

// const AppRoute = () => {
//     return (
//         <Routes>
//             <Route path='/' element={LoginScreen}/>
//             <Route path='/chat' element={ChatScreen}/>
//         </Routes>
//     )
// }

// const AppRoute = createBrowserRouter([
//     {
//         path: '/',
//         element: <LoginScreen/>
//     },
//     {
//         path: '/chat',
//         element: <ChatScreen/>
//     }
// ])

export default AppRoute