import { useEffect, useState } from "react"
import { createContext, useContext } from "react"
import { getCurrUser } from "../util/session_storage/user"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const currUserId = getCurrUser()

        if ( currUserId ) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }

        function storageEventHandler(e) {
            console.log('storage event: ', e)
            if ( e.key !== 'curr_user_id' ) {
                setIsAuth(false)

                return
            }

            if ( e.newValue !== null ) {
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        }

        window.addEventListener('storage', storageEventHandler)

        return () => {
            window.removeEventListener('storage', storageEventHandler)
        }
    }, [setIsAuth])

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth