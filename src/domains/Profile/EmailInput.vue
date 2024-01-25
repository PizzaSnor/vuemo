<template>
    <input :value="email" @input="$emit('update:email', $event.target.value)" type="email" placeholder="Email" class="m-0.5 w-full px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
</template>

<script>
export default {
    name: "EmailInput",
    props: {
        props: ['email']
    }
}
</script>