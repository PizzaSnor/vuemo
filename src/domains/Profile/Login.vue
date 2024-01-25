<template>
    <MainCard class="mx-auto">
        <ProfileTitle>Login op MiniMois</ProfileTitle>
        <input v-model="email" type="email" placeholder="Email" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
        <input v-model="password" type="text" placeholder="Password" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
        <div class="flex items-center justify-between">
            <p class="ml-1">Geen account? <RouterLink to="/Signup" class="mr-8 underline">Signup!</RouterLink></p>
            <BasicButton @click="login" class="w-1/3 bg-vGreen text-vLight">Login</BasicButton>
        </div>
    </MainCard>
</template>

<script>
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import MainCard from '@/components/Main/MainCard.vue'
import ProfileTitle from './ProfileTitle.vue'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import BasicButton from '@/components/Basic/Forms/BasicButton.vue'

export default {
    name: "Login",
    components: {
        MainCard,
        ProfileTitle,
        EmailInput,
        PasswordInput,
        BasicButton
    },
    data() {
      return {
        email: null,
        password: null
      };
    },
    mounted() {
        this.checkedLoggedIn()
    },
    methods: {
        checkedLoggedIn() {
            this.$auth.onAuthStateChanged((user) => {
                if (user) {
                    this.$router.push('/Profile');
                }
            });
        },
        login() {
            signInWithEmailAndPassword(this.$auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    this.$router.push('/Profile');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }

}
</script>