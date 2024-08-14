import { SignIn } from '@clerk/nextjs'
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material'

export default function SignUpPage(){
    return(
        <Container maxWidth="sm">       
            <AppBar position='static' sx={{backgroundColor:"#3f5135"}}>
            <Toolbar>
                <Typography variance="h6" sx={{flexGrow:1}}>
                    FlashCard SaaS
                </Typography>
                <Button color="inherit">
                    <Link href="/sign-in" passHref>
                        Login 
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link href="/sign-up" passHref>
                        SignUp
                    </Link>
                </Button>
            </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            sx={{textAlign:'center', my:4}}>
                <Typography variant="h4" component="h1" gutterBottom> Sign In </Typography>
                <SignIn/>
            </Box>
        </Container>
    )
}