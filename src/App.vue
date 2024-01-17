<template>
  CoolieJoelie
  <Jammie></Jammie>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'; // Import as named export
import Jammie from '../src/components/Jammie.vue'

export default {
  name: "App",
  components: {Jammie},
  data() {
    return {};
  },
  mounted() {
    this.getDbData();
  },
  methods: {
    async getDbData() {
      const querySnapshot = await getDocs(collection(db, "notes"));
      querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
      });
    },
  },
};
</script>