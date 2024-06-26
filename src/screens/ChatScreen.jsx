import { useEffect, useState, useRef } from "react"
import { Container, Box, Typography, IconButton, Grid, TextField, Button, useMediaQuery, useTheme } from "@mui/material"
import { getCurrUser, removeCurrUser } from "../util/session_storage/user"
import { useIndexedDB } from "react-indexed-db-hook"
import LogoutIcon from '@mui/icons-material/Logout'
import useAuth from "../contexts/AuthContext"
import SendIcon from '@mui/icons-material/Send'
import Message from "../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { getAllMessages, addMessage, changePage } from "../redux/slices/messageSlice"
import ChatSkeleton from "../components/ChatSkeleton"
import useGetMessages from "../hooks/useGetMessages"

const ChatScreen = () => {
    const theme = useTheme()

    const [user, setUser] = useState()
    const [message, setMessage] = useState()

    const { getByID } = useIndexedDB('users')
    const messagesDB = useIndexedDB('messages')

    const { setIsAuth } = useAuth()

    const messages = useGetMessages()
    const dispatch = useDispatch()

    const smallMedia = useMediaQuery(theme.breakpoints.down('md'))

    const msgListRef = useRef()

    function handleLogout() {
        removeCurrUser()
        setIsAuth(false)
    }

    const user_id = getCurrUser()

    function handleSendMessage() {
        if ( message ) {
            const payload = { 
                senderId: parseInt(user_id), 
                senderName: user?.name, 
                message: message, 
                timestamps: new Date().getTime() 
            }

            messagesDB.add(payload).then(
                () => {
                    setMessage('')
                    dispatch(addMessage(payload))
                }
            )
        }
    }

    useEffect(() => {
        getByID(parseInt(user_id)).then((userDB) => {
            setUser(userDB)
        })
    }, [])

    function handleScroll() {
        const scrollY = msgListRef.current.scrollTop

        if ( scrollY == 0 ) {
            dispatch(changePage())
        }
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                minHeight: '100vh'
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingInline: '20px',
                    backgroundColor: theme.palette.primary.main,
                    maxHeight: '8vh',
                    paddingBlock: 1
                }}
            >
                <Typography noWrap sx={{ flex: 1 }} variant="h6" color="HighlightText">
                    {user?.name}
                </Typography>
                <IconButton edge="end" aria-label="logout" color="inherit" onClick={handleLogout}
                    sx={{
                        color: theme.palette.background.paper
                    }}
                >
                    <LogoutIcon/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    background: 'red',
                    height: 100,
                    overflowY: 'auto',
                    paddingInline: '20px',
                    paddingBlock: 2,
                    backgroundColor: '#F9F6EE' // Bone White 
                }}
                ref={msgListRef}
                onScroll={handleScroll}
            >
                {
                    messages.chats.data.map((val, key) => (
                        <Message
                            key={key}
                            messageObj={val}
                        />
                    ))
                }
            </Box>
            <Grid container sx={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField size="small" id="outlined-basic-messages" placeholder="Message" fullWidth multiline={true}
                        maxRows={3}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </Grid>
                <Grid xs={1} item align="right">
                    {
                        smallMedia ?
                        <IconButton
                            type="submit"
                            color="primary"
                            size="large"
                            onClick={handleSendMessage}
                        >
                            <SendIcon/>
                        </IconButton> :
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatScreen