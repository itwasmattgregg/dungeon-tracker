<template>
  <form v-on:submit.prevent="createStory">
    <v-flex xs3>
      <v-text-field name="author"
                    label="author"
                    id="author"
                    type="text"
                    disabled
                    v-model="author"
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
    <wysiwyg v-model="notes"/>
    <v-text-field name="notes"
                  label="Notes"
                  id="notes"
                  type="textarea"
                  v-model="notes"></v-text-field>

    <v-btn plus
           type="submit">Add Story</v-btn>
  </form>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseInit'


export default {
  name: "story-form",
  data() {
    return {
      pickerShowing: false,
      notes: "",
      session: "",
    };
  },
  firestore () {
    return {
      stories: db.collection('stories'),
    }
  },
  computed: {
    sessionDate() {
      if (!this.session) return null      
        return this.$moment(this.session).fromNow()
      
    },
    author(){
           return  this.$root.$data.user.displayName
    }
  },
  methods: {
    createStory(){
      db.collection('stories').add({
        notes: this.notes,
        session: this.session,
        owner: this.$root.$data.user.uid
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })

    
    }
  }
};
</script>

<style>
</style>
