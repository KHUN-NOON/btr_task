import { Card, CardActions, CardContent, Container, Button, Typography } from "@mui/material"
import { useForm, FormProvider } from "react-hook-form"
import TextInput from "../components/TextInput"
import { useIndexedDB } from "react-indexed-db-hook"
import { setCurrUser } from "../util/session_storage/user"
import { useNavigate } from "react-router-dom"
import useAuth from "../contexts/AuthContext"

const LoginScreen = () =>  {
    const method = useForm()
    const { setIsAuth } = useAuth()

    const { getByIndex, add } = useIndexedDB('users')

    const navigate = useNavigate()

    function handleNavigation (id) {
        setCurrUser(id)
        setIsAuth(true)
        navigate('/chat', { replace: true })
    }

    const handleForm = () => {
        const name = method.getValues('name')

        getByIndex('name', name).then(
            (personFromDB) => {
                if (personFromDB) {
                    handleNavigation(personFromDB.id)
                } else {
                    add({ name: name }).then(
                        (id) => {
                            handleNavigation(id)
                        },
                        (error) => {
                            console.log(error);
                        },
                    )
                }
            },
            (error) => {
                console.log(error);
            },
        )
    }

    return (
        <Container
            maxWidth='false'
            sx={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F9F6EE' // Bone White
            }}
        >
            <Card sx={{ minWidth: 345 }}>
                <FormProvider {...method}>
                    <form onSubmit={method.handleSubmit(handleForm)}>
                        <CardContent>
                            <Typography>Enter Name</Typography>
                            <TextInput
                                name='name'
                                size="small"
                                label="Name"
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" sx={{ flex: 1, mb: 2 }}
                                type="submit"
                            >
                                Enter Chat Room
                            </Button>
                        </CardActions>
                    </form>
                </FormProvider>
            </Card>
        </Container>
    )
}

export default LoginScreen