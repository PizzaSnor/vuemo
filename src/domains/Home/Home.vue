<template>
    <div class="flex justify-center">
        <MainCard>
            <GameTitle>Title van verhaal</GameTitle>
            <StoryTextLine :username="username" :reversed="true">
                Dit is een zin die laten zien moet worden en nu is ie wat langer aa wat gaat er gebeuren 
            </StoryTextLine>
            <StoryTextLine :username="username2">
                Dit is een zin die laten zien moet worden en nu is ie wat langer aa wat gaat er gebeuren 
            </StoryTextLine>
            <StoryTextLine :username="username">
                Dit is een zin die laten zien moet worden en nu is ie wat langer aa wat gaat er gebeuren 
            </StoryTextLine>
            <StoryTextLine :username="username2" :reversed="true">
                Dit is een zin die laten zien moet worden en nu is ie wat langer aa wat gaat er gebeuren 
            </StoryTextLine>
        </MainCard>
    </div>         
</template>

<script>
import MainCard from '../../components/Main/MainCard.vue';
import StoryTextLine from '../Gaminga/StoryTextLine.vue';
import GameTitle from '../Gaminga/GameTitle.vue';

export default {
    name: "Home",
    components: {
        MainCard,
        StoryTextLine,
        GameTitle
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