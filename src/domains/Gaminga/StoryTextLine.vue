<template>
    <div :class="{'flex-row-reverse': reversed}" class="flex m-1">
        <p :class="{'rounded-r-sm rounded-l-xl': !reversed, 'rounded-l-sm rounded-r-xl': reversed, [`text-${color}`]: color}" class=" flex items-center px-4 m-0.5 max-h-min shadow-custom border border-black text-2xl font-bold">{{ username + ':' }}</p>
        <p :class="{'rounded-r-sm rounded-l-xl': reversed, 'rounded-l-sm rounded-r-xl': !reversed, }" class="w-full m-0.5 px-4 py-2 shadow-custom text-vBlue border border-black text-2xl font-medium tracking-tighter">
            <slot></slot>
        </p>
    </div>

</template>
<script>
export default {
    name: "StoryTextLine",
    props: {
        username: {},
        color: {},
        reversed: {}
    },
}
</script>