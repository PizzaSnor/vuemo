<template>
  <div>
    <MainLayout>
      <MainHeader></MainHeader>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from './components/Main/MainLayout.vue';
import MainHeader from './components/Main/MainHeader.vue';


export default {
  name: "App",
  components: {MainHeader, MainLayout},
  data() {
    return {};
  },
};
</script>