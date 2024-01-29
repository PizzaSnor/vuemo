<template>
    <div class="flex flex-col items-center">
      <MainCard>
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
  data() {
    return {
      gameId: this.$route.params.id,
    }
  },
  mounted() {
    document.title = "Gaminga!"
  }
}
</script>