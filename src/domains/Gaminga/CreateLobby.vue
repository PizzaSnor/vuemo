<template>
    <MainCard class="mx-auto">
        <GameTitle>Create Gaminga lobby</GameTitle>
        <div class="flex">
            <input v-model="username" type="text" :placeholder="'Naam: ' +  randomName" class="m-0.5 w-3/4 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
            <ColorSelect @colorChanged="handleColorChange" class="w-1/4"></ColorSelect>
        </div>
        <div class="flex mt-2">
            <button @click="createLobby" class="w-full py-4 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">Join!</button>
        </div>
    </MainCard>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
                console.log(user.uid)
            }
        })
    },
    methods: {
        handleColorChange(color) {
            this.selectedColor = color
        },
        async createLobby() {
            console.log(this.userId);
            const lobbyId = Math.floor(100000 + Math.random() * 900000).toString();

            const lobbyRef = doc(this.$db, 'lobbies', lobbyId);

            await setDoc(lobbyRef, {
                createdAt: serverTimestamp(),
                creatorUserId: this.userId,
            });

            const participantRef = doc(lobbyRef, 'participants', this.userId);
            await setDoc(participantRef, {
                userId: this.userId,
                username: this.username,
                color: this.selectedColor,
            });

            console.log('Lobby created with id: ' + lobbyId);
        }
    },
    computed: {
        randomName() {
            return this.randomNames[Math.floor(Math.random() * this.randomNames.length)]
        }
    }
}
</script>