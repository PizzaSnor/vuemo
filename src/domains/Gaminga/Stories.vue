<template>
    <MainCard class="mx-auto">
        <div v-if="storyLoaded">
            <GameTitle>{{storyName}}</GameTitle>
            <StoryTextLine v-for="line in dialog" :username="line.username" :color="line.color" :reversed="line.userId === uid">
                {{ line.content }}
            </StoryTextLine>
            <div v-if="host === uid" class="flex justify-end">
                <BasicButton class="bg-vBlue text-vLight w-1/2" @click="previousStory">Vorige verhaal</BasicButton>
                <BasicButton class="bg-vGreen text-vLight w-1/2" @click="nextStory">Volgende verhaal</BasicButton>
            </div>
        </div>
        <div v-else>
            <GameTitle>Laden...</GameTitle>
        </div>

    </MainCard>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';

import MainCard from '@/components/Main/MainCard.vue';
import GameTitle from './GameTitle.vue';
import StoryTextLine from './StoryTextLine.vue';
import BasicButton from '@/components/Basic/Forms/BasicButton.vue';

export default {
    name: "Stories",
    components: { MainCard, GameTitle, StoryTextLine, BasicButton },
    data() {
        return {
            gameId: this.$route.params.id,
            uid: null,
            storyLoaded: false,
            currentStoryId: null,
            particpants: null,
            storyName: null,
            dialog: null,
            host: null,
        }
    },
    mounted() {
        onAuthStateChanged(this.$auth, (user) => {
            if (user) {
                this.uid = user.uid
            }
        })

        this.lobbyRef = doc(this.$db, "lobbies", this.gameId);
        this.partLength()
    },
    beforeDestroy() {
        if (this.unsubscribeLobby) {
            this.unsubscribeLobby();
        }
    },
    methods: {
        async partLength() {
            const participantsRef = collection(this.lobbyRef, "participants");
            const participantsSnapshot = await getDocs(participantsRef);
            this.participants = participantsSnapshot.docs.map(doc => doc.data());

            this.syncLobby()
        },
        async syncLobby() {
            this.unsubscribeLobby = onSnapshot(this.lobbyRef, async (lobby) => {
                if (lobby.exists()) {
                    this.storyLoaded = false
                    this.lobbyData = lobby.data();
                    this.host = this.lobbyData.creatorUserId;

                    const currentStoryIndex = this.lobbyData.story;
                    const storiesRef = collection(this.lobbyRef, 'stories');
                    const storyDoc = await getDoc(doc(storiesRef, `story${currentStoryIndex}`));

                    this.currentStory = storyDoc.data();
                    this.storyName = this.currentStory.storyName;

                    const dialogRef = collection(this.lobbyRef, 'stories', `story${currentStoryIndex}`, 'dialogue');
                    const dialogueSnapshot = await getDocs(query(dialogRef, orderBy('timestamp')));
                    this.dialog = dialogueSnapshot.docs.map(doc => doc.data());

                    this.storyLoaded = true;

                    this.showDialogue();
                }
            });
        },
        showDialogue() {

        },
        async nextStory() {
            console.log(this.lobbyData.story + 1, this.participants.length - 1);
            if ((this.lobbyData.story + 1) <= (this.participants.length - 1)) {
                await updateDoc(this.lobbyRef, {
                    story: (this.lobbyData.story + 1)
                })
            } else {
                console.error('No more stories!')
            }
        },
        async previousStory() {
            if (this.lobbyData.story > 0) {
                await updateDoc(this.lobbyRef, {
                    story: (this.lobbyData.story - 1)
                })
            }
        }
    }
}
</script>