<template>
    <div>
        <div v-if="!submitted">
            <form @submit.prevent="emitStoryLine">
                <div v-if="round == 1">
                    <input v-model="title" maxlength="25" placeholder="Vul hier je titel in!" class="w-full m-0.5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg placeholder-custom" type="text">
                </div>
                <div class="flex my-1">
                    <input v-model="line" maxlength="75" placeholder="Vul hier je zin in!" class="w-full m-0.5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-l-lg rounded-r-sm placeholder-custom" type="text">
                    <button class="text-vLight bg-vGreen flex items-center px-4 ml-0.5 my-0.5 max-h-min shadow-custom border border-black text-2xl font-semibold rounded-l-sm rounded-r-lg" >Doen</button>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="w-full m-0.5 px-4 py-4 outline-none shadow-custom text-vBlue bg-vLight border border-black text-2xl font-medium tracking-tighter rounded-lg" type="text">
                Nog even wachten op de rest...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubmitLine",
    data() {
        return {
            title: null,
            line: null,
        }
    },
    props: {
        round: {},
        submitted: {
            default: false
        }
    },
    mounted() {

    },
    methods: {
        emitStoryLine() {
            if (this.line) {
                const storyData = { line: this.line, round: this.round }

                if (this.title) {
                    storyData.title = this.title
                    this.title = ''
                }

                this.$emit('emitStoryLine', storyData)
                this.line = ''
            }
        }
    },

}
</script>