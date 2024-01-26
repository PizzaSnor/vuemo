<template>
    <div class="flex  justify-center flex-col sm:flex-row">
        <MainCard>
            <GameTitle>Lobby #{{ this.lobbyId }}</GameTitle>
            <Chat>
                <ChatBubble :username="naampje" :reversed="true" :color="colortje">Hallo Jongens</ChatBubble>
                <ChatBubble :username="naampje3" :color="colortje2">Hooiiii</ChatBubble>
                <ChatBubble :username="naampje2" :color="colortje3">Wooow wat de chips</ChatBubble>
            </Chat>
        </MainCard>
        <div class="sm:ml-4">
            <MiniCard>
                <Heading2 class="text-center">Spelers: {{  }}/6</Heading2>
                <PlayerTile v-for="participant in participants" :class="`text-${participant.color}`">{{ participant.username }}</PlayerTile>
            </MiniCard>
            <MiniCard >
                <Heading2 class="text-center">Jij bent de host!</Heading2>
            </MiniCard>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

import MainCard from '@/components/Main/MainCard.vue';
import MiniCard from '@/components/Main/MiniCard.vue';
import Heading2 from '@/components/Basic/Heading/Heading2.vue'
import GameTitle from './GameTitle.vue';
import PlayerTile from './PlayerTile.vue';
import Chat from './Chat/Chat.vue';
import ChatBubble from './Chat/ChatBubble.vue';

export default {
    name: "Lobby",
    components: {
    MainCard,
    GameTitle,
    MiniCard,
    Heading2,
    PlayerTile,
    Chat,
    ChatBubble
},
    data() {
        return {
            lobbyId: this.$route.params.id,
            lobby: null,
            participants: null,
            naampje: 'Tim',
            naampje2: 'Indra',
            naampje3: 'Nour',
            colortje: 'vOrange',
            colortje2: 'vGreen',
            colortje3: 'vPurple'
        };
    },
    mounted() {
        this.findLobby();
    },
    methods: {
        async findLobby() {
            const docRef = doc(this.$db, "lobbies", this.lobbyId);
            this.lobby = await getDoc(docRef);
            if (this.lobby.exists()) {
                const participantsRef = collection(docRef, "participants");
                const participantsSnapshot = await getDocs(participantsRef);
                this.participants = participantsSnapshot.docs.map((doc) => doc.data());
                console.log(this.participants);
            }
            else {
                console.log("No such lobby!");
                this.$router.push('/JoinGaminga')
            }
        }
    },
}
</script>