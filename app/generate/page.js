'use client'

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Generate(){
    const [isLoaded, isSignedin, user] = useUser()
    const [flashCards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const router = useRouter

    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards!')
        }

        try {
        const response = await fetch('api/generate ', {
            method: 'POST',
            body: text,
        })
        
        if (!response.ok){
            throw new Error('Failed to generate flashcards!')
        }

        const data = await response.json()
        setFlashCards(data)
        } catch (error){
        console.error('ERROR: Generating flashcards', error)
        alert('An error occured while generating flashcards. Please try again!')
        }
    }

    //WORK ON THIS PART 51:00
    // const handleCardclick = {id} => {
    //     setFlipped (prev) => ({
    //         ...prev,
    //         {id} : !prev{id}
    //     })
    const handleOpen =() =>{setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const handleOpenDialog =() =>{setDialogOpen(true)}
    const handleCloseDialog = () => {setDialogOpen(false)}

    const saveFlashcards = async()=> {
        if(!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
        }

        try {
            const userDocRef = doc(collection(db,'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)

            const batch = writeBatch(db)

            if(userDocSnap.exists()){
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), {name: setName}]
                batch.update(userDocRef, {flashcardSets: updatedSets})
            } else {
                batch.set(userDocRef, {flashCardSets: [{name:setName}]})
            }
            
            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, {flashCards})
            await batch.commit()

            alert('Flashcards saved succesfully!')
            handleCloseDialog()
            setName('')
        } catch (error){
            console.error("ERROR: Saving flashcards", error)
            alert('An error occured while saving flashcards. Please try again.')
        }
    }

    return(
        <Container maxWidth="md">
            <Box sx={{my:4}}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Generate Flashcards
                </Typography>
                <TextField value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter Text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{mb:2}}/>
                <Button variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth>
                    Generate FlashCards
                </Button>
            </Box>
            {flashCards.length > 0 && (
                <Box sx={{mt:4}}>
                    <Typography variant='h5' component='h2' gutterBottom>
                        Generate Flashcards
                    </Typography>
                    <Grid container_spacing={2}>
                        {flashCards.map((flashcard,index)=> (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant='h6'>
                                            Front: 
                                        </Typography>
                                        <Typography>
                                            {flashcard.front}
                                        </Typography>
                                        <Typography variant='h6' sx={{mt:2}}>
                                            Back
                                        </Typography>
                                        <Typography>
                                            {flashcard.back}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    )
}