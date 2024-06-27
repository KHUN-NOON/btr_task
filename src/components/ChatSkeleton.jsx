import { Divider, Grid, ListItem, Skeleton } from "@mui/material"

const ChatSkeleton = () => {
    return (
        <>
            {
                Array.from(Array(8)).map((_, key) => (
                    <ListItem disablePadding
                        key={key}
                        sx={{
                            mb: 2
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <Skeleton variant="rounded" width={210} height={60}
                                    sx={{
                                        float: key % 3 == 0 ? 'left' : 'right'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                ))
            }
        </>
    )
}

export default ChatSkeleton