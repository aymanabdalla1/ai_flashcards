"use client";

import Image from "next/image";
import getStripe from "@/utils/get-stripe.js";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  Toolbar,
  Typography,
  AppBar,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="100vw"
      sx={{
        background: "linear-gradient(to bottom right, #e0f7fa, #80deea)", // Soft gradient background
        minHeight: "100vh", // Ensure full height
        fontFamily: "Arial, sans-serif",
        padding: "20px", // Add some padding
      }}
    >
      <Head>
        <title>Flashcard SaaS</title>
        <meta
          name="description"
          content="Create flashcards from your text with AI"
        />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: "#00796b" }}>
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          >
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              {" "}
              Login{" "}
            </Button>
            <Button color="inherit" href="/sign-up">
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
        sx={{
          textAlign: "center",
          my: 4,
          color: "#333",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Welcome to Flashcard Saas!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to make flaschards from your text!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#00796b', textAlign: 'center' }}>Features</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Easy Text Input</Typography>
                <Typography>
                  Simply input your text and let our software do the rest. Creating 
                  flashcards has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Smart Flashcards</Typography>
                <Typography>
                  Our AI intelligently breaks down your text into concise 
                  flashcards, perfect for studying.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Accessible Anywhere</Typography>
                <Typography>
                  Access your flashcards from any device, at any time. Study on the 
                  go with ease.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>

        <Grid container_spacing={4}>
          <Grid item my={12} mx={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $5/month
              </Typography>
              <Typography>
                {" "}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variance="contained" colors="primary" sx={{ mt: 2 }}>
                Choose Basic
              </Button>
            </Box>

            <Grid item my={12} mx={6}></Grid>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $10/month
              </Typography>
              <Typography>
                {" "}
                Unlimited flaschards and storage, with piority support.
              </Typography>
              <Button variance="contained" colors="primary" sx={{ mt: 2 }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
