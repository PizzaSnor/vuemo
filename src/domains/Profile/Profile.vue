<template>
    <div>
        <MainCard class="mx-auto">
            <ProfileTitle v-if="user">Welkom {{ user.email }}</ProfileTitle>
            <ProfileTitle v-else>Laden...</ProfileTitle>
            <BasicButton @click="logout" class="bg-vBlue text-vLight ml-auto">Logout</BasicButton>
        </MainCard>
    </div>
</template>

<script>
import { signOut, onAuthStateChanged } from "firebase/auth";

import BasicButton from "@/components/Basic/Forms/BasicButton.vue";
import MainCard from "@/components/Main/MainCard.vue";
import ProfileTitle from "./ProfileTitle.vue";


export default {
    name: "Profile",
    components: { BasicButton, MainCard, ProfileTitle },
    data() {
        return {
            user: null,
        }
    },
    beforeMount() {
        this.getUserData()
    },
    methods: {
        logout() {
            signOut(this.$auth)
                .then(() => {
                this.$router.push('/Login');
            })
                .catch((error) => {
                console.error("Error during logout:", error);
            });
        },
        async getUserData() {
            onAuthStateChanged(this.$auth, (user) => {
                if (user) {
                    this.user = user;
                } else {
                    console.warn("No user is signed in.");
                }
            });
        },
    },
}
</script>s