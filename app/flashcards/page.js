'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState} from 'react'

import { CollectionReference, doc, getDoc, setDoc } from "firebase/firestore"
import {db} from '@/firebase'
import { useRouter, useSearchParams } from "next/navigation"

export default function flashcards(){
    const { isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return

            const colRef = collection(doc(dollection(db,'users'), user.id), search)
            const docs = await getDoc(colRef)
            const flashcards = []
            docs.forEach((doc) => {
                flashcards.push({id:doc.id, ...doc.data()})
            })
            setFlashCards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    const handleCardclick = (id) => {
        setFlipped((prev)=>({
            ...prev, [id]: !prev[id]
        }))
    }

    return (
        <Container maxWidth="md">
        <Grid container_spacing={3} sx={{mt:4}}>
            {flashCards.map((flashcard,index)=> (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={()=>handleCardclick(flashcard.id)}>
                        <CardContent>
                            <Box sx={{
                            //watch video at 1:05:00
                            }}>
                            <div><div>
                            <Typography variant='h5' component='div'>
                                {flashcard.front}
                            </Typography>
                            </div><div>
                            <Typography variant='h5' component='div'>
                                {flashcard.back}
                            </Typography>
                            </div></div></Box>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
    )
}