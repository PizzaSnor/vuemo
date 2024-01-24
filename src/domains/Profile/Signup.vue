<template>
    <MainCard class="mx-auto">
        <ProfileTitle>Maak een account op MiniMois</ProfileTitle>
        <UsernameInput></UsernameInput>
        <PasswordInput></PasswordInput>
        <div class="flex items-center justify-between">
            <p class="ml-1">Al een account? <RouterLink to="/Login" class="mr-8 underline">Login!</RouterLink></p>
            <BasicButton class="w-1/3 bg-vGreen text-vLight">Sign Up</BasicButton>
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
    name: "Signup",
    components: {
        MainCard,
        ProfileTitle,
        UsernameInput,
        PasswordInput,
        BasicButton
    }

}
</script>