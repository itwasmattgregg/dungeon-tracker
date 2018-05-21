<template>
  <form v-on:submit.prevent="createQuest">
    <v-text-field
      name="name"
      label="Name"
      id="name"
      type="text"
      v-model="name"
      required></v-text-field>
    <v-text-field
      name="location"
      label="Location"
      id="location"
      type="text"
      v-model="location"
      ></v-text-field>
    <v-text-field
      name="returnTo"
      label="Return To"
      id="returnTo"
      type="text"
      v-model="returnTo"
      ></v-text-field>
    <v-select
      v-model="rewards"
      label="Rewards"
      hint="Type a reward and hit enter to add"
      chips
      tags
    ></v-select>
    <v-btn type="submit">Add Quest</v-btn>
  </form>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseInit'

export default {
  name: 'quest-form',
  data () {
    return {
      name: '',
      location: '',
      returnTo: '',
      rewards: '',
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
