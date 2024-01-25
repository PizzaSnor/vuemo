<template>
    <input :value="password" @input="$emit('update:password', $event.target.value)" type="text" placeholder="Password" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
</template>

<script>
export default {
    name: "PasswordInput",
    props: ['password']
}
</script>