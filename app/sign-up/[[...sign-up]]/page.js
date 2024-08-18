import { SignUp } from '@clerk/nextjs'
import {AppBar, Button, Container, Toolbar, Typography, Box} from '@mui/material'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import QuizIcon from '@mui/icons-material/Quiz';
import Link from 'next/link'
import React from 'react'

export default function SignUpPage(){
    return(
        <Container
        maxWidth="100vw"
        sx={{
          background: "linear-gradient(to bottom right, #16E0BD, #78C3FB)", // Soft gradient background
          minHeight: "100vh", // Ensure full height
          fontFamily: "Arial, sans-serif",
          padding: "20px", // Add some padding
        }}
      >      
      <AppBar position="static" sx={{ backgroundColor: "#26547C" }}>
        <Toolbar>
        <Link href="/" passHref>
        <QuizIcon fontSize="large" sx={{ color: "#fff", mr:1}} />
        </Link>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          >
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" 
                variant="contained"
                sx={{
                  mr:1,
                  borderRadius: 1,
                  color: "#26547C",
                  backgroundColor: "#FCFCFC",
                  padding: "10px 30px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
              {" "}
              Login{" "}
            </Button>
            <Button color="inherit" href="/sign-up" 
                variant="contained"
                sx={{
                  borderRadius: 1,
                  color: "#26547C",
                  backgroundColor: "#FCFCFC",
                  padding: "10px 30px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
              {" "}
              Sign Up{" "}
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          textAlign: "center",
          my: 4,
          padding: "40px",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      >
            <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#26547C" }}
        >
          {" "}
          Sign Up{" "}
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
