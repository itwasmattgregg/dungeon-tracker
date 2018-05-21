<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Quests</h1>
        <quest-form></quest-form>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="quest in quests"
              :key="quest.id"
            >
              <quest :quest="quest"></quest>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import questForm from './QuestForm.vue'
import quest from './Quest.vue'
import db from '../firebaseInit'

export default {
  data () {
    return {
      quests: [],
    }
  },
  components: {
    questForm,
    quest,
  },
  created () {
    db.collection('quests')
    .onSnapshot((querySnapshot) => {
      this.quests = []
      querySnapshot.forEach(doc => {
        this.quests.push(doc.data())
      })
    })
  },
}
</script>

<style>

</style>
