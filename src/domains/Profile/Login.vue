<template>
    <MainCard class="mx-auto">
        <ProfileTitle>Login op MiniMois</ProfileTitle>
        <UsernameInput></UsernameInput>
        <PasswordInput></PasswordInput>
        <div class="flex items-center justify-between">
            <p class="ml-1">Geen account? <RouterLink to="/Signup" class="mr-8 underline">Signup!</RouterLink></p>
            <BasicButton class="w-1/3 bg-vGreen text-vLight">Login</BasicButton>
        </div>
    </MainCard>
</template>

<script>
import MainCard from '@/components/Main/MainCard.vue'
import ProfileTitle from './ProfileTitle.vue'
import UsernameInput from './UsernameInput.vue'
import PasswordInput from './PasswordInput.vue'
import BasicButton from '@/components/Basic/Forms/BasicButton.vue'

export default {
    name: "Login",
    components: {
        MainCard,
        ProfileTitle,
        UsernameInput,
        PasswordInput,
        BasicButton
    }

}
</script>