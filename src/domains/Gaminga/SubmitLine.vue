<template>
    <div>
        <input placeholder="Vul hier je titel in!" class="w-full m-0.5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom" type="text">
    </div>
    <div class="flex my-1">
        <input placeholder="Vul hier je zin in!" class="w-full m-0.5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-l-lg rounded-r-sm placeholder-custom" type="text">
        <button class="text-vLight bg-vGreen flex items-center px-4 ml-0.5 my-0.5 max-h-min shadow-custom border border-black text-2xl font-semibold rounded-l-sm rounded-r-lg" >Doen</button>
    </div>
</template>

<script>
export default {
    name: "SubmitLine",
    props: {
        firstLine: {}
    }
}
</script>