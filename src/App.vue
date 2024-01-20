<template>
  <MainHeader></MainHeader>
  <router-view></router-view>
</template>

<script>
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/firebase'; // Import as named export
import MainHeader from '../src/components/main/MainHeader.vue'

export default {
  name: "App",
  components: {MainHeader},
  // data() {
  //   return {};
  // },
  // mounted() {
  //   this.getDbData();
  // },
  // methods: {
  //   async getDbData() {
  //     const querySnapshot = await getDocs(collection(db, "notes"));
  //     querySnapshot.forEach(doc => {
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   },
  // },
};
</script>