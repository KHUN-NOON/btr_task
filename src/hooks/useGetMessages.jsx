import { useEffect, useState } from "react"
import { useIndexedDB } from "react-indexed-db-hook"
import { useDispatch, useSelector } from "react-redux"
import { getAllMessages } from "../redux/slices/messageSlice"
import { paginate } from "../util/paginate"

const useGetMessages = () => {
    const [isLoading, setIsLoading] = useState(false)

    const chats = useSelector((state) => state.messages)
    const dispatch = useDispatch()
    
    const { getAll } = useIndexedDB('messages')

    useEffect(() => {
        setIsLoading(true)

        getAll().then(chatDB => {
            const copied = [...chatDB]

            const limitChats = paginate(copied, chats.limit, chats.page)

            dispatch(getAllMessages({data: limitChats, total: chatDB.length}))

            setIsLoading(false)    
        })
    }, [chats.page])

    return {
        chats,
        isLoading,
        setIsLoading
    }
}

export default useGetMessages