'use client'

import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { 
  Box, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  Grid, 
  CardContent, 
  CardActionArea, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Dialog, 
  Card 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";
import QuizIcon from '@mui/icons-material/Quiz';
import Link from 'next/link'

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch('/api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch flashcards');
        }
        return res.json();
      })
      .then((data) => setFlashcards(data));
  };

//   const handleSubmit = async () => {
//     if (!text.trim()) {
//       alert('Please enter some text to generate flashcards.')
//       return
//     }
  
//     try {
//       const response = await fetch('api/generate', {
//         method: 'POST',
//         body: text,
//       })
  
//       if (!response.ok) {
//         throw new Error('Failed to generate flashcards')
//       }
  
//       const data = await response.json()
//       setFlashcards(data)
//     } catch (error) {
//       console.error('Error generating flashcards:', error)
//       alert('An error occurred while generating flashcards. Please try again.')
//     }
//   }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const saveFlashcards = async () => {
    if (!name) {
        alert('Please enter a name');
        return;
    }

    if (!isSignedIn) {
        alert('User is not logged in');
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name == name)) {
            alert('Flashcard collection with the same name already exists.');
            return;
        } else {
            collections.push({ name });
            batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
    } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
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
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >        <Link href="/" passHref>
      <QuizIcon fontSize="large" sx={{ color: "#fff", mr:1}} />
      </Link>
               <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", textAlign: "center", mb:2 }}
        >
          Generate Flashcards
        </Typography>
        <Paper sx={{ p: 4, width: '50%', boxShadow: 3, borderRadius: 2 }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
            }}
          />
          <Button
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            fullWidth

            sx={{
                mt: 2,
                borderRadius: 35,
                backgroundColor: "#EF476F",
                padding: "15px 20px",
                fontSize: "15px",
                boxShadow: 2,
              }}
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#26547C', textAlign: 'center', fontWeight:'bold' }}>
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(index);
                    }}
                  >
                    <CardContent>
                      <Box sx={{
                        perspective: '1000px',
                        ' & > div': {
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          position: 'relative',
                          width: '100%',
                          height: '200px',
                          boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                          transform: flipped[index]
                            ? 'rotateY(180deg)' 
                            : 'rotateY(0deg)',
                        },
                        ' & > div > div': {
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: "hidden",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 2,
                          boxSizing: 'border-box',
                          backgroundColor: '#fff',
                          borderRadius: '8px',
                        },
                        ' & > div > div:nth-of-type(2)': {
                          transform: 'rotateY(180deg)',
                        },
                      }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ color: '#26547C' }}>
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div" sx={{ color: '#26547C' }}>
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  mt: 2,
                  borderRadius: 35,
                  boxShadow: 2,
                  backgroundColor: "#EF476F",
                  padding: "15px 40px",
                  fontSize: "15px",
                }}
              >
              Save 
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Save Flashcards </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField 
            autoFocus 
            margin="dense" 
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}