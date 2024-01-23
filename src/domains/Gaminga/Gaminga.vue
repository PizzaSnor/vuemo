<template>
    <div class="flex flex-col items-center">
      <MainCard id="CreateOrJoin">
        <CreateOrJoin></CreateOrJoin>
      </MainCard>
      <MainCard id="JoinLobby">
        <GameTitle>Join Gaminga lobby</GameTitle>
        <JoinLobby></JoinLobby>
      </MainCard>
      <MainCard id="CreateLobby">
        <GameTitle>Create Gaminga lobby</GameTitle>
        <CreateLobby></CreateLobby>
      </MainCard>
    </div>
</template>

<script>
import StoryPage from './StoryPage.vue';
import MainCard from '@/components/Main/MainCard.vue';
import CreateOrJoin from './CreateOrJoin.vue';
import GameTitle from './GameTitle.vue';
import JoinLobby from './JoinLobby.vue';
import CreateLobby from './CreateLobby.vue';

export default {
  name: "Gaminga",
  components: {
    StoryPage,
    MainCard,
    CreateOrJoin,
    GameTitle,
    JoinLobby,
    CreateLobby
  },
  methods: {

  }
}
</script>