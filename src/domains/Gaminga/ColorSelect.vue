<template>
    <div class="flex border min-w-fit border-black p-4 rounded-lg m-0.5 shadow-custom">
        <div :class="'bg-' + selectedColor" class="min-w-8 min-h-8 mr-2 border border-black rounded-full">
        </div>
        <select @change="emitColor" v-model="selectedColor" class="bg-vLight outline-none">
            <option value="vGreen">Groen</option>
            <option value="vYellow">Geel</option>
            <option value="vPurple">Paars</option>
            <option value="vOrange">Oranje</option>
            <option value="vBlue">Blauw</option>
            <option value="vRed">Rood</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "ColorSelect.vue",
    data () {
        return {
            selectedColor: 'vBlue'
        }
    },
    methods: {
        emitColor() {
            this.$emit('colorChanged', this.selectedColor)
        }
    }
}
</script>