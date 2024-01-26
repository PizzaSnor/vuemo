<template>
    <div>
        <MainCard>
            Dit is je profiel geniet ervan
            <BasicButton @click="logout" class="bg-vBlue text-vLight">Logout</BasicButton>
        </MainCard>
    </div>
</template>

<script>
import { signOut } from "firebase/auth";
import BasicButton from "@/components/Basic/Forms/BasicButton.vue";
import MainCard from "@/components/Main/MainCard.vue";


export default {
    name: "Profile",
    component: {
        BasicButton
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
        }
    },
    components: { BasicButton, MainCard }
}
</script>