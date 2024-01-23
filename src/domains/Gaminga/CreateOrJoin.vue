<template>
    <MainCard class="mx-auto">
        <div class="flex flex-col items-center mb-8">
            <h1 class="text-6xl mt-4 font-medium text-vBlue tracking-tighter">Gaminga!</h1>
            <p class="text-lg font-medium text-vBlue tracking-tighter">Create or join a lobby</p>
        </div>
        <div class="flex justify-around">
            <button @click="signInAnonymousHost" class="w-fit py-4 px-8 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">Create lobby!</button>
            <button @click="join" class="w-fit py-4 px-8 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">Join existing!</button>
        </div>
    </MainCard>
</template>

<script>
import { signInAnonymously } from "firebase/auth";

import MainCard from '@/components/Main/MainCard.vue';

export default {
    name: "CreateOrJoin.vue",
    components: {
        MainCard
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        async signInAnonymousHost() {
            signInAnonymously(this.$auth)
            .then((user) => {
            })
        },
        join() {

        },
        create() {

        }
    }
}
</script>