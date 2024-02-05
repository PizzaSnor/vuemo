<template>
    <div :class="{'flex-row-reverse': reversed, [`text-${color}`]: true}" class="flex m-1 gap-1">
        <p :class="{'rounded-r-sm rounded-l-xl': !reversed, 'rounded-l-sm rounded-r-xl': reversed }" class="flex items-center px-4 max-h-min shadow-custom border border-black text-2xl font-bold underline">{{ username }}</p>
        <p :class="{'rounded-r-sm rounded-l-xl': reversed, 'rounded-l-sm rounded-r-xl': !reversed }" class="w-fit px-4 py-2 shadow-custom border border-black text-2xl font-medium tracking-tighter">
            <slot></slot>
        </p>
    </div>

</template>

<script>
export default {
    name: "ChatBubble",
    props: {
        username: {},
        color: {},
        reversed: {
            default: false
        }
    },
}
</script>