<template>
    <button class="w-fit m-0.5 px-4 py-2 bg-vBlue text-vLight shadow-custom border border-black text-xl font-medium tracking-tighter rounded-r-lg rounded-l-sm">
        <slot></slot>
    </button>

</template>

<script>
export default {
    name: "ChatSend"
}
</script>