<template>
    <div class="flex  justify-center flex-col sm:flex-row">
        <MainCard>
            <GameTitle>Lobby #{{ this.lobbyId }}</GameTitle>
            <Chat ref="chatContainer">
                <ChatBubble v-for="chat in chatMessages" :username="chat.name" :color="chat.color" :reversed="this.uid == chat.userId">{{ chat.content }}</ChatBubble>
            </Chat>
            <form @submit.prevent="sendChatMessage" class="flex m-0.5">
                <input v-model="outboundMessage" type="text" placeholder="Typ iets controversieels..." class="flex items-center w-full bg-vLight outline-none px-4 m-0.5 max-h-min shadow-custom border border-black text-xl font-bold rounded-l-lg rounded-r-sm placeholder-custom">
                <ChatSend>Stuur</ChatSend>
            </form>
        </MainCard>
        <div class="sm:ml-4">
            <MiniCard>
                <Heading2 v-if="participants" class="text-center">Spelers: {{ participants.length }}/6</Heading2>
                <Heading2 v-else class="text-center">Laden..</Heading2>
                <PlayerTile v-for="participant in participants" :class="`text-${participant.color}`">{{ participant.username }}</PlayerTile>
            </MiniCard>
            <MiniCard v-if="host == uid">
                <Heading2 class="text-center">Jij bent de host!</Heading2>
                <BasicButton @click="startGame" class="bg-vGreen text-vLight w-full">Start!</BasicButton>
            </MiniCard>
        </div>
    </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';

import PlayerTile from './PlayerTile.vue';
import ChatBubble from './Chat/ChatBubble.vue';
import GameTitle from './GameTitle.vue';
import MainCard from '@/components/Main/MainCard.vue';
import MiniCard from '@/components/Main/MiniCard.vue';
import Heading2 from '@/components/Basic/Heading/Heading2.vue'
import Chat from './Chat/Chat.vue';
import ChatSend from './Chat/ChatSend.vue';
import BasicButton from '@/components/Basic/Forms/BasicButton.vue';

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
    ChatSend,
    BasicButton
},
    data() {
        return {
            host: null,
            lobbyId: this.$route.params.id,
            lobbyRef: null,
            lobby: null,
            participants: null,
            chatMessages: [],
            outboundMessage: null,
            chatRef: null,
            uid: null,
            you: null,
            unsubscribeMessages: null,
            unsubscribeParticipants: null,
        };
    },
    beforeDestroy() {
        if (this.unsubscribeMessages) {
            this.unsubscribeMessages();
        }
        if (this.unsubscribeParticipants) {
            this.unsubscribeParticipants()
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
    watch: {
        chatMessages(newMessages) {
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
    },
    methods: {
        async findLobby() {
            this.lobbyRef = doc(this.$db, "lobbies", this.lobbyId);
            this.lobby = await getDoc(this.lobbyRef);
            this.lobbyData = this.lobby.data();

            if (this.lobby.exists() && this.lobbyData.canJoin) {
                const participantsRef = collection(this.lobbyRef, "participants");
                this.host = this.lobbyData.creatorUserId;
                
                this.unsubscribeParticipants = onSnapshot(participantsRef, (snapshot) => {

                    this.participants = snapshot.docs.map((doc) => doc.data());

                    this.you = this.participants.find((participant) => participant.userId === this.uid);

                    if (this.you) {
                        this.getChatMessages();
                        this.scrollToBottom();
                    } else {
                        this.$router.push({ path: '/JoinGaminga', query: { lobbyId: this.lobbyId } });
                    }
                });
            } else {
                this.$router.push('/JoinGaminga');
            }
        },
        async getChatMessages() {
            this.chatRef = collection(this.lobby.ref, 'chat');

            this.unsubscribeMessages = onSnapshot(query(this.chatRef, orderBy('time')), (snapshot) => {
                this.chatMessages = snapshot.docs.map(doc => {
                    /*
                    MAD GOOF!!!!!!!! Niet veilig maar fak die tock.
                    Zehema werkt goed.
                    */
                    const docData = doc.data()
                    if(docData.content == "Go!" && docData.userId == "server") {
                        setTimeout(() => {
                            this.redirectToGame()
                        }, 2000)
                    }
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
            });
        },
        async sendChatMessage() {
            if (this.outboundMessage) {
                this.chatRef = collection(this.lobby.ref, 'chat');

     
                await addDoc(this.chatRef, {
                    content: this.outboundMessage,
                    time: serverTimestamp(),
                    name: this.you.username,
                    userId: this.uid,
                    color: this.you.color
                })

                this.scrollToBottom()
            }

            this.outboundMessage = ''
        },
        /*
        * Start game, create stories logic
        */
        async sendServerMessage(content) {
            await addDoc(this.chatRef, {
                    content: content,
                    time: serverTimestamp(),
                    name: 'Server',
                    userId: 'server',
                    color: 'vBlue'
                })

            this.scrollToBottom()
        },
        async startGame() {
            this.changeJoinability()
            this.createStories()
            this.sendServerMessage('Game starts in: 5', this.chatRef)

            let countDown = 4;

            let gameTimer = setInterval(() => {
                this.sendServerMessage(countDown, this.chatRef)

                countDown--

                if (countDown == 0) {
                    clearInterval(gameTimer)  
                    this.asignRounds()
                    this.sendServerMessage('Go!', this.chatRef)
                } 
            }, 1000);
        },
        async createStories() {
            let i = 0;

            console.log("RUAAAAAAH");
            for (const [key, participant] of this.participants.entries()) {
                const storyRef = doc(this.lobbyRef, 'stories', 'story' + key);
                await setDoc(storyRef, {
                    storyName: participant.username + '\'s verhaal',
                    color: participant.color,
                    partId: i,
                });

                const dialogueCollectionRef = collection(storyRef, 'dialogue');
                await addDoc(dialogueCollectionRef, {
                    partId: i,
                });

                i++;
            }
        },
        async asignRounds() {

            const totalRounds = this.lobbyData.roundAmounts; 
            const totalStories = this.participants.length;
            const roundsCollectionRef = collection(this.lobbyRef, "rounds");

            for (let roundNumber = 1; roundNumber <= totalRounds; roundNumber++) {
                const roundRef = doc(roundsCollectionRef, `round${roundNumber}`);
                const participantsCollectionRef = collection(roundRef, "participants");

                for (let participantIndex = 0; participantIndex < this.participants.length; participantIndex++) {
                    // NIET AANRAKEN!1! Holy grail van het asignen van stories
                    const storyIndex = (participantIndex + roundNumber - 1) % totalStories;
                    // !!

                    const senderParticipantIndex = (participantIndex - 1 + this.participants.length) % this.participants.length;
                    const sender = this.participants[senderParticipantIndex];

                    const participantRef = doc(participantsCollectionRef, this.participants[participantIndex].userId);
                    await setDoc(participantRef, {
                        storyId: `story${storyIndex}`,
                        senderId: sender.userId,
                    });
                }
            }
        },
        async redirectToGame() {
            this.$router.push(`/Gaminga/${this.lobbyId}`)
        },
        async changeJoinability() {
            await updateDoc(this.lobbyRef, {
                canJoin: false
            });
        },
        /*
        * End of start game and create stories logic
        */
        scrollToBottom() {
            this.$refs.chatContainer.$el.scrollTop = this.$refs.chatContainer.$el.scrollHeight;
        }
    },
}
</script>