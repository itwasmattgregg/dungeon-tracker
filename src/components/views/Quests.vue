<template>
  <v-container fluid
               grid-list-xl>
    <v-layout row
              wrap>
      <v-flex xs12
              class="text-xs-center"
              my-2>
        <h1><span v-if="showCompleted">Completed</span> Quests</h1>
        <v-switch label="Show Completed Tasks"
                  v-model="showCompleted"></v-switch>
        <quest-form></quest-form>
      </v-flex>
      <v-flex xs12
              class="text-xs-center"
              my-1>
        <v-container fluid
                     grid-list-md>
          <!-- Open Quest List -->
          <v-layout row
                    wrap
                    v-if="quests.length > 0 && !showCompleted">
            <v-flex xs12
                    sm6
                    v-for="quest in quests"
                    :key="quest.id">
              <quest v-on:complete-quest="archiveQuest(quest)"
                     :quest="quest">
              </quest>

            </v-flex>
          </v-layout>
          <!-- Completed Quests -->
          <v-layout row
                    wrap>
            <v-flex xs12
                    sm6
                    mx-auto
                    v-if="showCompleted ">

              <v-list two-line
                      subheader>
                <quest-complete v-for="quest in quests"
                                :quest="quest"
                                :key="quest.key"
                                @reopen="reOpenQuest(quest)" />

              </v-list>

            </v-flex>
          </v-layout>
          <v-layout row
                    wrap
                    v-if="quests.length == 0">
            <v-flex xs12>
              <h2>Looks like you don't have any quests right now. Create a new
                one by clicking the button in the lower left.</h2>
            </v-flex>
          </v-layout>
          <portal-target name="add-quest-modal"></portal-target>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "../../firebaseInit.js";
import firebase from "firebase";

// Components
import questForm from "../QuestForm.vue";
import quest from "../Quest.vue";
import questComplete from "../QuestComplete.vue";

export default {
  components: {
    questForm,
    quest,
    questComplete
  },
  data() {
    return {
      loading: true,
      showCompleted: false,
      openQuests: [],
      completedQuests: []
    };
  },
  computed: {
    quests() {
      if (this.showCompleted) {
        return this.completedQuests;
      } else {
        return this.openQuests;
      }
    }
  },
  watch: {
    quests() {
      if (this.openQuests.length) {
        this.loading = false;
      }
    }
  },
  firestore() {
    return {
      completedQuests: db
        .collection("quests")
        .where("status", "==", "completed"),
      openQuests: db.collection("quests").where("status", "==", "open")
    };
  },
  methods: {
    archiveQuest(quest) {
      db.collection("quests")
        .doc(quest[".key"])
        .update({
          status: "completed",
          dateCompleted: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    reOpenQuest(quest) {
      db.collection("quests")
        .doc(quest[".key"])
        .update({
          status: "open",
          dateCompleted: null
        });
    }
  }
};
</script>

<style>
</style>
