import Image from "next/image";
import getStripe from "./utils/get-stripe.js";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Toolbar, Typography, AppBar, Button, Head } from "@mui/material";

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
    </Container>
  );
}
