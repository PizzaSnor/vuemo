<template>
    <div class="flex flex-col items-center">
      <MainCard>
        
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

export default {
    name: "Gaminga",
    components: {
        StoryPage,
        MainCard,
        CreateOrJoin,
        GameTitle,
    },
    data() {
        return {
            gameId: this.$route.params.id,
            lobby: null,
            lobbyData: null,
            lobbyRef: null,
            stories: null,
            currentStory: null,
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

            if (this.lobby.exists()) {
                const participantsRef = collection(this.lobbyRef, "participants");
                this.host = this.lobbyData.creatorUserId;
                
                this.unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {

                    this.participants = snapshot.docs.map((doc) => doc.data());

                    this.you = this.participants.find((participant) => participant.userId === this.uid)

                    if (!this.you) {
                        this.yeetBack('/JoinGaminga')
                    }

                    if(this.lobbyData.round == 0) {
                        console.log('cabround')
                        this.asignStory()
                    }
                });
            } else {
                this.yeetBack('/JoinGaminga')
            }
        },
        async asignStory() {
            const storyId = `story${this.you.partId}`;
            const storyRef = doc(this.lobbyRef, 'stories', storyId);
            this.currentStory = await getDoc(storyRef);

            if (this.currentStory.exists()) {
                const dialogueCollectionRef = collection(storyRef, 'dialogue');
                const dialogueSnapshot = await getDocs(dialogueCollectionRef);
                this.currentDialogue = dialogueSnapshot.docs.map(doc => doc.data());
            } else {
                // Handle the case where the story doesn't exist
                console.error(`Error: Story ${storyId} does not exist.`);
            }
            console.log(this.currentDialogue)
        },
        async addLineToStory() {

        },
        yeetBack(route) {
            this.$router.push(route);
        }
    }
}
</script>