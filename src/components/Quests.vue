<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Quests</h1>
        <quest-form></quest-form>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <quest></quest>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import questForm from './QuestForm.vue'
import quest from './Quest.vue'
export default {
  components: {
    questForm,
    quest,
  }

}
</script>

<style>

</style>
