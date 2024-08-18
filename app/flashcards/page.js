'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from 'next/navigation';
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Button} from "@mui/material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container 
      maxWidth="100vw" 
      sx={{ 
        background: "linear-gradient(to bottom right, #16E0BD, #78C3FB)", // Soft gradient background
        minHeight: "100vh", // Ensure full height
        fontFamily: "Arial, sans-serif",
        padding: "20px", // Add some padding
        padding: '20px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#26547C', mb: 4, textAlign: 'center' }}>
        Your Flashcard Collections
      </Typography>
      <Button color="inherit" href="/" 
                variant="contained"
                sx={{
                  borderRadius: 1,
                  color: "#26547C",
                  backgroundColor: "#FCFCFC",
                  padding: "10px 30px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
              {" "}
              Home{" "}
            </Button>
      <Grid container spacing={3}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardActionArea 
                onClick={() => {
                  handleCardClick(flashcard.name);
                }}
              >
                <CardContent sx={{ textAlign: 'center', backgroundColor: '#fff' }}>
                  <Typography variant="h6" sx={{ color: '#00796b' }}>
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}