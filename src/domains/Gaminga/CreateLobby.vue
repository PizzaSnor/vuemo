<template>
        <div class="flex">
            <input type="text" :placeholder="'Naam: ' +  randomName" class="m-0.5 w-3/4 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom">
            <ColorSelect class="w-1/4"></ColorSelect>
        </div>
        <div class="flex mt-2">
            <button class="w-full py-4 bg-vGreen text-vLight text-2xl border border-black m-0.5 shadow-custom rounded-lg">Join!</button>
        </div>
</template>

<script>
import ColorSelect from './ColorSelect.vue';

export default {
    name: "CreateLobby",
    components: {
        ColorSelect
    },
    data() {
        return {
            randomNames: [
                'Kikker',
                'Nhauwd',
                'Grasp',
                'Patron',
                'Escopeta',
                'Gunga?',
                'Huh?',
                'Mimo',
                'Juan',
                'Carlos'
            ]
        }
    },
    computed: {
        randomName() {
            return this.randomNames[Math.floor(Math.random() * this.randomNames.length)]
        }
    }
}
</script>