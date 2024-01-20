<template>
    <header class="bg-[#F1EFE7]">
        <img :src="imgUrl" alt="MINIMOIS LOGO" class="h-20">
    </header>
</template>

<script>
import { ref, getDownloadURL } from 'firebase/storage';

export default {
    name: "Jammie",
    data() {
        return {
            imgUrl: null
        }
    },
    mounted() {
        const storageRef = ref(this.$storage, 'minimoislogo.png')
        
        getDownloadURL(storageRef)
            .then((url) => {
                this.imgUrl = url
            })
            .catch(error => {
                console.error('Error getting download URL: ', error);
            })
    }
}
</script>