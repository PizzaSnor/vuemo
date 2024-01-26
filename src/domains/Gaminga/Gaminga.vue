<template>
    <div class="flex flex-col items-center">
      <MainCard id="CreateOrJoin">
        Spelverloop
      </MainCard>
    </div>
</template>

<script>
import StoryPage from './StoryPage.vue';
import MainCard from '@/components/Main/MainCard.vue';
import CreateOrJoin from './CreateOrJoin.vue';
import GameTitle from './GameTitle.vue';

export default {
  name: "Gaminga",
  components: {
    StoryPage,
    MainCard,
    CreateOrJoin,
    GameTitle,
  },
  mounted() {
    document.title = "Huuuh"
  }
}
</script>