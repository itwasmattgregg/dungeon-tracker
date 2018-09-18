<template>
  <form v-on:submit.prevent="createQuest">
      <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="session"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="session"
          label="Picker without buttons"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="session" @input="$refs.menu2.save(session)"></v-date-picker>

      </v-menu>



    <v-text-field
    readonly      name="location"
      label="Location"
      id="location"
      type="text"
      v-model="location"
      ></v-text-field>
      <v-text-field
      name="notes"
      label="Notes"
      id="notes"
      type="text"
      v-model="notes"
      ></v-text-field>

        

    <v-btn plus type="submit">Add Story</v-btn>
  </form>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseInit'

export default {
  name: 'story-form',
  data () {
    return {
      name: '',
      location: '',
      notes: '',
      session: '',
      author: '',
    }
  },
  methods: {
    createQuest () {
      db.collection('quests').add({
        name: this.name,
        location: this.location,
        returnTo: this.returnTo,
        rewards: this.rewards,
        status: 'open',
        owner: this.$root.$data.user.uid,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        this.resetFields()
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    },
    resetFields () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
  },
}
</script>

<style>

</style>
