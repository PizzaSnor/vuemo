<template>
  <div class="flex flex-col items-center">
    <Heading1 class="w-fit m-2">Gaminga verhalen</Heading1>
    <div class="p-4 w-3/4 bg-vLight mx-auto shadow-xl border border-vDark rounded">
        <div class="font-bold underline text-vBlue">Wat komt hierna?</div>
        <StoryTextLine>Toen Nout het zag was hijaap stomverbaasd. Hij sprintte weg met mach 3 richting de KFC</StoryTextLine>
        <StoryInput></StoryInput>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import Heading1 from '../../components/Basic/Heading/Heading1.vue'
import StoryTextLine from './StoryTextLine.vue'
import StoryInput from './StoryInput.vue'

export default {
  name: "StoryPage",
  components: {
    Heading1,
    StoryTextLine,
    StoryInput
  },
};
</script>