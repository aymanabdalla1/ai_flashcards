import { SignUp } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static" sx={{ backgroundColor: "#3f5135" }}>
        <Toolbar>
          <Typography variance="h6" sx={{ flexGrow: 1,               flexGrow: 1,
              fontWeight: 'bold',
              color: '#fff'}}>
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

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ textAlign: "center", my: 4,           backgroundColor: '#fff', 
            padding: '40px', 
            borderRadius: '8px', 
            boxShadow: 3, 
            marginTop: '40px'}}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          {" "}
          Sign Up{" "}
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
