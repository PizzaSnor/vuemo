<template>
    <div class="flex mt-4 gap-1">
        <input v-model="storyInputValue" type="text"  class="p-2 w-full  shadow-lg bg-vBlue text-vLight rounded-l-lg rounded-r-sm">
        <button @click="pushStoryLine()" class="bg-vOrange px-2 text-vLight font-bold rounded-r-lg rounded-l-sm">Doen</button>
    </div>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';

export default {
    name: "StoryInput",
    data() {
        return {
            storyInputValue: null
        }
    },
    methods: {
        async pushStoryLine() {
            const storyCollectionRef = collection(this.$db, 'story');

            const newStoryDocRef = await addDoc(storyCollectionRef, {
                content: this.storyInputValue,
            });

            console.log('New Story Document ID:', newStoryDocRef.id);

            this.storyInputValue = null;
        },
    }
}
</script>