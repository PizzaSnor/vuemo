<template>
    <header class="bg-vLight shadow-lg flex">
        <img :src="imgUrl" alt="MINIMOIS LOGO" class="h-20">
        <div class="flex">
            <HeaderButton><RouterLink to="/Home">Home?</RouterLink></HeaderButton>
            <HeaderButton><RouterLink to="/CreateOrJoin">Gamingas?</RouterLink></HeaderButton>
        </div>
    </header>
</template>

<script>
import { ref, getDownloadURL } from 'firebase/storage';
import HeaderButton from '../Basic/Header/HeaderButton.vue'
import { routerViewLocationKey } from 'vue-router';

export default {
    name: "Jammie",
    components: {
    HeaderButton,
    routerViewLocationKey
},
    data() {
        return {
            imgUrl: null
        }
    },
    mounted() {
        const storageRef = ref(this.$storage, 'logo/justmois.png')
        
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