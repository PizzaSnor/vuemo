<template>
    <div class="flex flex-col items-center">
      <MainCard>
        
      </MainCard>
    </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';

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
            this.lobbyRef = doc(this.$db, "lobbies", this.gameId);
            this.lobby = await getDoc(this.lobbyRef);
            this.lobbyData = this.lobby.data();

            if (this.lobby.exists()) {
                const participantsRef = collection(this.lobbyRef, "participants");
                this.host = this.lobbyData.creatorUserId;
                
                this.unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {

                    this.participants = snapshot.docs.map((doc) => doc.data());

                    this.you = this.participants.find((participant) => participant.userId === this.uid);
                });
            } else {
                this.$router.push('/JoinGaminga');
            }
        }
    }
}
</script>