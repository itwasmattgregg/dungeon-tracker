<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" my-2>
        <h1>Quests</h1>
        <quest-form></quest-form>
      </v-flex>
      <v-flex xs12 class="text-xs-center" my-1>
        <v-container fluid grid-list-md>
          <v-layout row wrap v-if="quests.length > 0">
            <v-flex
              xs12 sm6
              v-for="quest in quests"
              :key="quest.id"
            >
              <quest
                v-on:complete-quest="archiveQuest(quest)"
                :quest="quest"
              >
              </quest>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-else>
            <v-flex
              xs12
            >
            <portal-target name="add-quest-modal"></portal-target>
              <h2>Looks like you don't have any quests right now. Create a new one by clicking the button in the lower left.</h2>
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
      loading: true,
    }
  },
  components: {
    questForm,
    quest
  },
  watch: {
    quests () {
      if (this.quests.length) {
        this.loading = false
      }
    }
  },
  firestore () {
    return {
      quests: db.collection('quests').where('status', '==', 'open')
    }
  },
  methods: {
    archiveQuest (quest) {
      db.collection('quests').doc(quest['.key']).update({
        status: 'completed'
      })
    },
  }
}
</script>

<style>
</style>
