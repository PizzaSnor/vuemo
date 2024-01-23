<template>
    <div>
      
    </div>         
</template>

<script>
import MainCard from '../../components/Main/MainCard.vue';
import StoryTextLine from '../Gaminga/StoryTextLine.vue';
import GameTitle from '../Gaminga/GameTitle.vue';
import SubmitLine from '../Gaminga/SubmitLine.vue';
import SubText from '../Gaminga/SubText.vue';
import JoinLobby from '../Gaminga/JoinLobby.vue';
import CreateLobby from '../Gaminga/CreateLobby.vue';
import CreateOrJoin from '../Gaminga/CreateOrJoin.vue';

export default {
    name: "Home",
    components: {
        MainCard,
        StoryTextLine,
        GameTitle,
        SubmitLine,
        SubText,
        JoinLobby,
        CreateLobby,
        CreateOrJoin
    },
    data() {
        return {
            username: "Tim",
            username2: "Nour",
            color: "#B264CD",
        }
    }

}
</script>