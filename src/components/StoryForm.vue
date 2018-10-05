<template>
  <form-card>
    <form v-on:submit.prevent=""
          class="story-form">
      <v-layout row>
        <v-flex xs3>
          <v-text-field name="author"
                        label="author"
                        id="author"
                        type="text"
                        disabled
                        v-model="user.name"
                        xs6></v-text-field>
        </v-flex>
        <v-flex xs6>

          <v-menu ref="pickerShowing"
                  :close-on-content-click="false"
                  v-model="pickerShowing"
                  :nudge-right="40"
                  :return-value.sync="session"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                  xs6>
            <v-text-field slot="activator"
                          v-model="sessionDate"
                          label="Select date of session"
                          prepend-icon="event"
                          readonly></v-text-field>
            <v-date-picker v-model="session"
                           @input="$refs.pickerShowing.save(session)"
                           no-title></v-date-picker>

          </v-menu>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <ty-editor />
      </v-flex>

      <!-- <ty-editor/> -->


    </form>

  </form-card>
</template>

<script>
import firebase from "firebase";
import {mapGetters} from 'vuex';
import db from "../firebaseInit";
import TyEditor from "../components/TyEditor";
import FormCard from "./FormCard.vue";

export default {
  components: {
    TyEditor,
    FormCard
  },
  name: "story-form",
 
  data() {
    return {
      pickerShowing: false,
      notes: "",
      session: "",
    };
  },
  firestore() {
    return {
      stories: db.collection("stories")
    };
  },
  computed: {
     ...mapGetters(['user']),
    sessionDate() {
      if (!this.session) return null;
      return this.$moment(this.session).fromNow();
    }
  },
  methods: {
    createStory() {
      db.collection("stories")
        .add({
          notes: this.notes,
          session: this.session
          // owner: this.$root.$data.user.uid
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.story-form {
  min-height: 65vh;
  min-width: 75vw;
}
</style>
