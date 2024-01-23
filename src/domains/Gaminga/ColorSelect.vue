<template>
    <div class="flex border min-w-fit border-black p-4 rounded-lg m-0.5 shadow-custom">
        <div :class="circleBg" class="min-w-8 min-h-8 mr-2 border border-black rounded-full">
        </div>
        <select v-model="circleBg" class="bg-vLight outline-none">
            <option selected value="bg-vGreen">Groen</option>
            <option value="bg-vYellow">Geel</option>
            <option value="bg-vPurple">Paars</option>
            <option value="bg-vOrange">Oranje</option>
            <option value="bg-vBlue">Blauw</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "ColorSelect.vue",
    data () {
        return {
            circleBg: 'bg-Purple'
        }
    }
}
</script>