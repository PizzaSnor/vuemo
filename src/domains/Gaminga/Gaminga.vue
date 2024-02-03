<template>
    <div class="flex flex-col items-center">
      <MainCard>
        <GameTitle v-if="currentStory">{{currentStory.storyName}}</GameTitle>
        <SubText>Schrijf eens iets leuks</SubText>
      </MainCard>
    </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';

import StoryPage from './StoryPage.vue';
import MainCard from '@/components/Main/MainCard.vue';
import CreateOrJoin from './CreateOrJoin.vue';
import GameTitle from './GameTitle.vue';
import SubText from './SubText.vue';

export default {
    name: "Gaminga",
    components: {
    StoryPage,
    MainCard,
    CreateOrJoin,
    GameTitle,
    SubText
},
    data() {
        return {
            gameId: this.$route.params.id,
            lobby: null,
            lobbyData: null,
            lobbyRef: null,
            dialogRef: null,
            stories: null,
            senderId: null,
            currentStory: null,
            currentStoryId: null,
            currentRound: null,
            currentDialogue: null,
            host: null,
            participants: null,
            unsubscribeParticipants: null,
            you: null,
        }
    },
    mounted() {
        onAuthStateChanged(this.$auth, (user) => {
            if (user) {
                this.uid = user.uid
            }
        })
        document.title = "Gaminga!"
        this.syncLobby()
    },
    beforeDestroy() {
      if (this.unsubscribeParticipants) {
        this.unsubscribeParticipants()
      }
    },
    methods: {
        async syncLobby() {
            this.lobbyRef = doc(this.$db, "lobbies", this.gameId)
            this.lobby = await getDoc(this.lobbyRef)
            this.lobbyData = this.lobby.data()

            //This checks if the lobby exist and and sets dataproperties to be accessed easily
            if (this.lobby.exists()) {
                const participantsRef = collection(this.lobbyRef, "participants");
                this.host = this.lobbyData.creatorUserId;
                                
                this.unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {

                    this.participants = snapshot.docs.map((doc) => doc.data());

                    this.you = this.participants.find((participant) => participant.userId === this.uid)

                    if (this.you) {
                        this.getRounds()
                    } else {
                        this.yeetBack('/JoinGaminga')
                    }
                });
            } else {
                this.yeetBack('/JoinGaminga')
            }
        },
        async getRounds() {
            const roundsRef = collection(this.lobbyRef, 'rounds');
            const roundNumber = this.lobbyData.round;

            // roundref is a non-existent ancestor document
            const roundRef = doc(roundsRef, `round${roundNumber}`);

            const participantsCollection = collection(roundRef, 'participants');

            try {
                const participantsSnapshot = await getDocs(participantsCollection);
                participantsSnapshot.forEach(async participantDoc => {
                    const roundParticipantData = participantDoc.data();
                    if (roundParticipantData.partId == this.you.partId) {
                        this.currentStoryId = roundParticipantData.storyId;
                        this.senderId = roundParticipantData.senderId;

                        const storiesRef = collection(this.lobbyRef, 'stories');
                        const storyDoc = await getDoc(doc(storiesRef, this.currentStoryId));

                        if (storyDoc.exists()) {
                        this.currentStory = storyDoc.data();
                        this.dialogRef = collection(this.lobbyRef, 'stories', this.currentStoryId, 'dialogue');
                        const dialogueSnapshot = await getDocs(this.dialogRef);

                        // Accessing the data of each document in the 'dialogue' subcollection
                        this.currentDialogue = dialogueSnapshot.docs.map(doc => doc.data());
                        console.log(this.currentDialogue);
                    }
                    }
                });
            } catch (error) {
                console.error('Error fetching rounds:', error);
            }
        },
        async addLineToStory() {

        },
        yeetBack(route) {
            this.$router.push(route);
        }
    }
}
</script>