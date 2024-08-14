import Image from "next/image";
import getStripe from "../utils/get-stripejs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text with AI" />
      </Head>
    </Container>
  );
}
