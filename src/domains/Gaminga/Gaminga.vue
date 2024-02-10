<template>
    <div class="flex flex-col items-center">
      <MainCard>
        <div v-if="readyToShow">
            <GameTitle v-if="storyName">{{storyName}}</GameTitle>
            <div v-if="lobbyData.round != 1 && !submitted">
                <SubText><span class="underline">{{ lastScentance.username }}</span> zei:</SubText>
                <StoryTextLine :username="lastScentance.username" :color="lastScentance.color">{{ lastScentance.content }}</StoryTextLine>
            </div>
            <SubText v-if="!submitted">Schrijf iets leuks!</SubText>
            <SubText v-else>Waarom is iedereen zo sloom</SubText>
            <SubmitLine @emitStoryLine="addLineToStory" :round="round" :submitted="submitted"></SubmitLine>
        </div>
        <div v-else>
            <GameTitle>Laden...</GameTitle>
        </div>
      </MainCard>
    </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';

import StoryPage from './StoryPage.vue';
import MainCard from '@/components/Main/MainCard.vue';
import CreateOrJoin from './CreateOrJoin.vue';
import GameTitle from './GameTitle.vue';
import SubText from './SubText.vue';
import StoryTextLine from './StoryTextLine.vue';
import SubmitLine from './SubmitLine.vue';

export default {
    name: "Gaminga",
    components: {
    StoryPage,
    MainCard,
    CreateOrJoin,
    GameTitle,
    SubText,
    StoryTextLine,
    SubmitLine
},
    data() {
        return {
            gameId: this.$route.params.id,
            storyName: null,
            lobby: null,
            lobbyData: null,
            round: null,
            lobbyRef: null,
            dialogRef: null,
            stories: null,
            storyRef: null,
            senderId: null,
            currentStory: null,
            currentStoryId: null,
            currentRound: null,
            currentDialogue: null,
            lastScentance: null,
            secondToLastScentance: null,
            host: null,
            participants: null,
            unsubscribeParticipants: null,
            you: null,
            submitted: false,
            readyToShow: false
        }
    },
    mounted() {
        onAuthStateChanged(this.$auth, (user) => {
            if (user) {
                this.uid = user.uid
            }
        })
        document.title = "Gaminga! #" + this.gameId
        this.syncLobby()
    },
    beforeDestroy() {
      if (this.unsubscribeParticipants) {
        this.unsubscribeParticipants()
      }
    },
    methods: {
        async syncLobby() {
            this.readyToShow = false

            this.lobbyRef = doc(this.$db, "lobbies", this.gameId)
            this.lobby = await getDoc(this.lobbyRef)
            this.lobbyData = this.lobby.data()

            if (this.lobby.exists()) {
                const participantsRef = collection(this.lobbyRef, "participants")

                this.unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {
                    this.participants = snapshot.docs.map((doc) => doc.data())
                    this.you = this.participants.find((participant) => participant.userId === this.uid)
                    this.submitted = this.you.submitted
                    this.round = this.lobbyData.round

                    this.amountAmountSubmitted = this.participants.filter((part) => part.submitted).length

                    if (this.amountAmountSubmitted == this.participants.length) {
                        this.incrementRound()
                    }

                    if (this.you) {
                        this.getRounds()
                    } else {
                        this.yeet('/JoinGaminga')
                    }
                })
            } else {
                this.yeet('/JoinGaminga')
            }
        },
        async getRounds() {
            const roundsRef = collection(this.lobbyRef, 'rounds')
            const roundNumber = this.lobbyData.round

            // roundref is a non-existent ancestor document
            const roundRef = doc(roundsRef, `round${roundNumber}`)
            const participantsCollection = collection(roundRef, 'participants')

            try {
                const participantsSnapshot = await getDocs(participantsCollection)
                participantsSnapshot.forEach(async participantDoc => {
                    const roundParticipantData = participantDoc.data()
                    if (roundParticipantData.partId == this.you.partId) {
                        this.currentStoryId = roundParticipantData.storyId
                        this.senderId = roundParticipantData.senderId

                        const storiesRef = collection(this.lobbyRef, 'stories')
                        const storyDoc = await getDoc(doc(storiesRef, this.currentStoryId))

                        if (storyDoc.exists()) {
                            this.currentStory = storyDoc.data()
                            this.storyName = this.currentStory.storyName
                            this.dialogRef = collection(this.lobbyRef, 'stories', this.currentStoryId, 'dialogue')

                            const dialogueSnapshot = await getDocs(query(this.dialogRef, orderBy('timestamp')))

                            // Accessing the data of each document in the 'dialogue' subcollection
                            this.currentDialogue = dialogueSnapshot.docs.map(doc => doc.data())
                            this.lastScentance = this.currentDialogue[this.currentDialogue.length - 1]
                            
                            this.readyToShow = true
                        }
                    }
                })
            } catch (error) {
                console.error('Error fetching rounds:', error)
            }
        },
        async addLineToStory(inputObject) {
            this.submitted = true

            try {
                if (inputObject.title) {
                    const storiesRef = collection(this.lobbyRef, 'stories')
                    const storyDocRef = doc(storiesRef, this.currentStoryId) 

                    try {
                        await updateDoc(storyDocRef, {
                            storyName: inputObject.title
                        })
                        this.storyName = inputObject.title
                    } catch (error) {
                        console.error('Error updating story:', error)
                    }
                }

                await addDoc(this.dialogRef, {
                    content: inputObject.line,
                    color: this.you.color,
                    partId: this.you.partId,
                    timestamp: serverTimestamp(),
                    userId: this.you.userId,
                    username: this.you.username
                })

                const participantRef = doc(this.lobbyRef, 'participants', this.you.userId)

                await updateDoc(participantRef, {
                     submitted: true 
                })

                this.submitted = true
            } catch (error) {
                console.error('Error adding line to story:', error)
            }
        },
        async incrementRound() {

            const newRound = this.lobbyData.round + 1
            if (newRound <= this.lobbyData.roundAmounts) {
                this.unsubmitAllParticipants()
                await updateDoc(this.lobbyRef, {
                    round: newRound
                })
                this.round = newRound
                this.syncLobby()
            } else {
                this.yeet(`/Stories/${this.gameId}`)
            }
        },
        async unsubmitAllParticipants() {
            const participantsRef = collection(this.lobbyRef, "participants")

            this.participants.forEach(async (participant) => {
                const participantDocRef = doc(participantsRef, participant.userId)

                await updateDoc(participantDocRef, {
                    submitted: false,
                })
            })
        },
        yeet(route) {
            this.$router.push(route)
        }
    }
}
</script>