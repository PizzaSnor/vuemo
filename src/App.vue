<template>
  <div>
    <MainHeader></MainHeader>
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import MainLayout from './components/Main/MainLayout.vue';
import MainHeader from './components/Main/MainHeader.vue';


export default {
  name: "App",
  components: {MainHeader, MainLayout},
  data() {
    return {};
  },
  mounted() {
    this.getDbData();
  },
  methods: {
    async getDbData() {
      const querySnapshot = await getDocs(collection(this.$db, "notes"));
      querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
      });
    },
  },
};
</script>