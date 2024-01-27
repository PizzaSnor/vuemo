<template>
    <MainCard class="mx-auto">
        <form @submit.prevent="joinLobby">
            <GameTitle>Join Gaminga lobby</GameTitle>
            <div class="flex">
                <input v-model="username" type="text" :placeholder="'Naam: ' + randomName" class="m-0.5 w-3/4 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
                <ColorSelect @colorChanged="handleColorChange" class="w-1/4"></ColorSelect>
            </div>
            <div class="flex mt-2">
                <input v-model="lobbyId" type="text" placeholder="Lobby code" class="m-0.5 w-3/5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
                <button class="w-2/5 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">Join!</button>
            </div>
        </form>
    </MainCard>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


import MainCard from '@/components/Main/MainCard.vue';
import ColorSelect from './ColorSelect.vue';
import GameTitle from './GameTitle.vue';

export default {
    name: "JoinLobby",
    components: {
    ColorSelect,
    MainCard,
    GameTitle
},
    data() {
        return {
            lobbyId: null,
            userId: null,
            username: null,
            selectedColor: null,
            randomNames: [
                'Kikker',
                'Nhauwd',
                'Grasp',
                'Patron',
                'Escopeta',
                'Gunga?',
                'Huh?',
                'Mimo',
                'Ben'
            ]
        }
    },
    created() {
        if (this.$route.query.lobbyId) {
            this.lobbyId = this.$route.query.lobbyId
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
        async joinLobby() {
            const lobbyRef = doc(this.$db, 'lobbies', this.lobbyId);

            if (lobbyRef) {
                if (!this.selectedColor) {
                    this.selectedColor = 'vBlue'
                }
                const participantRef = doc(lobbyRef, 'participants', this.userId);
                await setDoc(participantRef, {
                    userId: this.userId,
                    username: this.username,
                    color: this.selectedColor,
                });

                this.$router.push(`/Lobby/${this.lobbyId}`)
            } else {
                console.log('That lobby dont even exists jo');
            }


        }
    },
    computed: {
        randomName() {
            return this.randomNames[Math.floor(Math.random() * this.randomNames.length)]
        }
    }
}
</script>