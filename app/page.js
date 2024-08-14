import Image from "next/image";
import getStripe from "./utils/get-stripe.js";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Toolbar, Typography, AppBar, Button, Head, Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text with AI" />
      </Head>
      <AppBar position = "static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit"> Login </Button>
            <Button color="inherit"> Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
        </AppBar>

        <Box sx={{
          textAlign:"center",
          my: 2
        }}>
          <Typography variant="h2" gutterBottom>
            Welcome to Flashcard Saas!
          </Typography>
          <Typography variant="h5" gutterBottom>
            {' '}
            The easiest way to make flaschards from your text!
          </Typography>
          <Button variance="contained" color="primary" sx={{mt: 2}}>
            Get Started
          </Button>
        </Box>

        <Box sx={{my:4}}>
          <Typography variant="h2" gutterBottom>
            Features
          </Typography>
          <Grid container_spacing = {4}>
            <Grid item my={12} mx={4}>
              <Typography variant="h6" gutterBottom>
                Easy Text Input!
              </Typography>
              <Typography>
                {' '}
                Simply input your text and let our software do the rest! Creating flashcards has never been easier!
              </Typography>

              <Typography variant="h6" gutterBottom>
                Smart Flashcards!
              </Typography>
              <Typography>
                {' '}
                Our AI intellegiently breaks down your text into concise flashcard, perfect for studying!
              </Typography>

              <Typography variant="h6" gutterBottom>
                Accesible anywhere!
              </Typography>
              <Typography>
                {' '}
                Access your flashcards from any device, at any time, at any place!
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{my:4, textAlign:"center"}}>
          <Typography variant="h4">
            Pricing
          </Typography>

          <Grid container_spacing = {4}>
            <Grid item my={12} mx={4}>
              <Box sx={{p:3, border:"1px solid", borderColor:"grey.300", borderRadius: 2
              }}>
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom> $5/month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variance="contained" colors="primary" sx={{mt:2}}>
                Choose Basic
              </Button>
              </Box>

              <Box sx={{p:3, border:"1px solid", borderColor:"grey.300", borderRadius: 2
              }}>
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom> $10/month</Typography>
              <Typography>
                {' '}
                Unlimited flaschards and storage, with piority support.
              </Typography>
              <Button variance="contained" colors="primary" sx={{mt:2}}>
                Choose Pro
              </Button>
              </Box>

              <Box>
              <Typography variant="h6">
                Accesible anywhere!
              </Typography>
              <Typography>
                {' '}
                Access your flashcards from any device, at any time, at any place!
              </Typography>
              </Box>

            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}
