<template>
    <MainCard class="mx-auto">
        <GameTitle>Create Gaminga lobby</GameTitle>
        <div class="flex">
            <input v-model="username" type="text" :placeholder="'Naam: ' +  randomName" class="m-0.5 w-3/4 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
            <ColorSelect @colorChanged="handleColorChange" class="w-1/4"></ColorSelect>
        </div>
        <div class="flex mt-2">
            <button @click="createLobby" class="w-full py-4 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">
                Create!
            </button>
        </div>
    </MainCard>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';

import ColorSelect from './ColorSelect.vue';
import MainCard from '@/components/Main/MainCard.vue';
import GameTitle from './GameTitle.vue';

export default {
    name: "CreateLobby",
    components: {
    ColorSelect,
    MainCard,
    GameTitle
},
    data() {
        return {
            userId: null,
            selectedColor: null,
            username: null,
            randomNames: [
                'Kikker',
                'Nhauwd',
                'Grasp',
                'Patron',
                'Escopeta',
                'Gunga?',
                'Huh?',
                'Mimo',
                'Juan',
                'Carlos'
            ]
        }
    },
    mounted() {
        onAuthStateChanged(this.$auth, (user) => {
            if (user) {
                this.userId = user.uid
            }
        })
    },
    methods: {
        handleColorChange(color) {
            this.selectedColor = color
        },
        async createLobby() {
            const lobbyId = Math.floor(100000 + Math.random() * 900000).toString();

            const lobbyRef = doc(this.$db, 'lobbies', lobbyId);

            await setDoc(lobbyRef, {
                createdAt: serverTimestamp(),
                creatorUserId: this.userId,
                canJoin: true,
                round: 1,
                roundAmounts: 6
            });

            const participantRef = doc(lobbyRef, 'participants', this.userId);
            await setDoc(participantRef, {
                userId: this.userId,
                username: this.username,
                color: this.selectedColor,
                partId: 1,
                submitted: false
            });

            const ChatCollectionRef = collection(lobbyRef, 'chat');
            const ChatData = {
                userId: 'server',
                name: 'Server',
                color: 'vBlue',
                content: 'Server created.',
                time: serverTimestamp()
            };

            await addDoc(ChatCollectionRef, ChatData);

            this.$router.push(`/Lobby/${lobbyId}`)
        }
    },
    computed: {
        randomName() {
            return this.randomNames[Math.floor(Math.random() * this.randomNames.length)]
        }
    }
}
</script>