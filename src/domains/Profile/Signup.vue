<template>
    <MainCard class="mx-auto">
      <ProfileTitle>Maak een account op MiniMois</ProfileTitle>
      <input v-model="email" type="email" placeholder="Email" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
      <input v-model="password" type="text" placeholder="Password" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
      <div class="flex items-center justify-between">
        <p class="ml-1">Al een account? <RouterLink to="/Login" class="mr-8 underline">Login!</RouterLink></p>
        <BasicButton @click="createUser" class="w-1/3 bg-vGreen text-vLight">Sign Up</BasicButton>
      </div>
    </MainCard>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from "firebase/auth";
  
  import MainCard from '@/components/Main/MainCard.vue'
  import ProfileTitle from './ProfileTitle.vue'
  import EmailInput from './EmailInput.vue'
  import PasswordInput from './PasswordInput.vue'
  import BasicButton from '@/components/Basic/Forms/BasicButton.vue'
  
  export default {
    name: "Signup",
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
        createUser() {
            console.log('Attempting to create user with:', this.email, this.password);
            createUserWithEmailAndPassword(this.$auth, this.email, this.password)
            .then((userCredential) => {
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