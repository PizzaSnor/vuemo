<template>
    <div class="flex  justify-center flex-col sm:flex-row">
        <MainCard>
            <GameTitle>Lobby #{{ this.lobbyId }}</GameTitle>
            <Chat>
                <ChatBubble v-for="chat in chatMessages" :username="chat.name" :color="chat.color" :reversed="this.uid == chat.userId">{{ chat.content }}</ChatBubble>
            </Chat>
            <form @submit.prevent="sendChatMessage" class="flex m-0.5">
                <input v-model="outboundMessage" type="text" placeholder="Typ iets controversieels..." class="flex items-center w-full bg-vLight outline-none px-4 m-0.5 max-h-min shadow-custom border border-black text-xl font-bold rounded-l-lg rounded-r-sm placeholder-custom">
                <ChatSend>Stuur</ChatSend>
            </form>
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
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';

import PlayerTile from './PlayerTile.vue';
import ChatBubble from './Chat/ChatBubble.vue';
import GameTitle from './GameTitle.vue';
import MainCard from '@/components/Main/MainCard.vue';
import MiniCard from '@/components/Main/MiniCard.vue';
import Heading2 from '@/components/Basic/Heading/Heading2.vue'
import Chat from './Chat/Chat.vue';
import ChatSend from './Chat/ChatSend.vue';

export default {
    name: "Lobby",
    components: {
    PlayerTile,
    ChatBubble,
    GameTitle,
    MainCard,
    MiniCard,
    Heading2,
    Chat,
    ChatSend
},
    data() {
        return {
            lobbyId: this.$route.params.id,
            lobby: null,
            participants: null,
            chatMessages: [],
            outboundMessage: null,
            chatRef: null,
            unsubscribe: null,
            uid: null,
            you: null,
        };
    },
    beforeDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    },
    mounted() {
        onAuthStateChanged(this.$auth, (user) => {
            if (user) {
                this.uid = user.uid
            }
        })
        this.findLobby()
    },
    methods: {
        async findLobby() {
            const docRef = doc(this.$db, "lobbies", this.lobbyId);
            this.lobby = await getDoc(docRef);

            if (this.lobby.exists()) {
                const participantsRef = collection(docRef, "participants");
                const participantsSnapshot = await getDocs(participantsRef);

                this.participants = participantsSnapshot.docs.map((doc) => doc.data());

                // Find the participant with the same ID as this.uid
                this.you = this.participants.find(participant => participant.userId === this.uid);

                this.getChatMessages();
            } else {
                this.$router.push('/JoinGaminga');
            }
        },
        async getChatMessages() {
            const chatRef = collection(this.lobby.ref, 'chat');

            this.unsubscribe = onSnapshot(query(chatRef, orderBy('time')), (snapshot) => {
                this.chatMessages = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
                });
            });
        },
        async sendChatMessage() {
            if (this.outboundMessage) {
                const chatRef = collection(this.lobby.ref, 'chat');

                await addDoc(chatRef, {
                    content: this.outboundMessage,
                    time: serverTimestamp(),
                    name: this.you.username,
                    userId: this.uid,
                    color: this.you.color
                })
            }

            this.outboundMessage = ''
        }
    },
}
</script>