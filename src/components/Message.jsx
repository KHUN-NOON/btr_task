import { Grid, ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { getCurrUser } from "../util/session_storage/user"

const Message = ({
    messageObj
}) => {
    const theme = useTheme()

    const { message, senderId, senderName, timestamps } = messageObj

    const times = new Date(timestamps).toLocaleTimeString()

    const currUser = getCurrUser()

    return (
        <ListItem disablePadding>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText 
                        secondaryTypographyProps={{
                            color: 'white',
                            backgroundColor: currUser == senderId ? theme.palette.grey[600] : theme.palette.primary.main,
                            borderRadius: 2,
                            padding: 1,
                            maxWidth: '20vw',
                            width: 'fit-content',
                            textAlign: 'left'
                        }}
                        align={ currUser == senderId ? "right" : "left" }
                        secondary={message}
                        primary={ currUser == senderId ? 'You' : senderName }
                    ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={ currUser == senderId ? "right" : "left" } secondary={times}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message