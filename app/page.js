"use client";

import Link from "next/link";
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
import QuizIcon from '@mui/icons-material/Quiz';

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        background: "linear-gradient(to bottom right, #16E0BD, #78C3FB)", // Soft gradient background
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

      <AppBar position="static" sx={{ backgroundColor: "#26547C" }}>
        <Toolbar>
        <Link href="/" passHref>
        <QuizIcon fontSize="large" sx={{ color: "#fff", mr:1}} />
        </Link>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, fontWeight: "bold", color: "#fff" }}
          > 
            FlashyCard
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
          <Button color="inherit" href="/flashcards" 
                variant="contained"
                sx={{
                  borderRadius: 1,
                  color: "#26547C",
                  backgroundColor: "#FCFCFC",
                  padding: "10px 30px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  mr:1
                }}
              >
              {" "}
              My Cards{" "}
            </Button>
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
          <QuizIcon fontSize="1000" sx={{ color: "#fff", mr:1}} /> FlashyCard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to make flaschards from your text!
        </Typography>
        <Button
                variant="contained"
                href="/generate"
                sx={{
                  mt: 2,
                  borderRadius: 35,
                  backgroundColor: "#EF476F",
                  padding: "15px 40px",
                  fontSize: "15px",
                  outlineColor: "#EF476F",
                  mr:2
                }}
              >
          Get Started
        </Button>
        <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: 35,
                  color: "#EF476F",
                  backgroundColor: 'white',
                  padding: "15px 40px",
                  fontSize: "15px",
                }}
              >
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
        >
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Easy Text Input
                </Typography>
                <Typography>
                  Simply input your text and let our software do the rest.
                  Creating flashcards has never been easier.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Smart Flashcards
                </Typography>
                <Typography>
                  Our AI intelligently breaks down your text into concise
                  flashcards, perfect for studying.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Accessible Anywhere
                </Typography>
                <Typography>
                  Access your flashcards from any device, at any time. Study on
                  the go with ease.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  borderRadius: 35,
                  backgroundColor: "#EF476F",
                  padding: "15px 20px",
                  fontSize: "15px",
                }}
              >
                Choose Basic
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "#fff",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  borderRadius: 35,
                  backgroundColor: "#EF476F",
                  padding: "15px 20px",
                  fontSize: "15px",
                }}
              >
                Choose Pro
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
