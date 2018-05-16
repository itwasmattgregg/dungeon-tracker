<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Home page</h1>
        <p v-if="!user.displayName">Please let us know the name of your character.</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <form v-on:submit.prevent="saveUser">
          <v-text-field
            name="email"
            label="Email"
            id="email"
            type="email"
            v-model="user.email"
            required></v-text-field>
          <v-text-field
            name="character"
            label="Character Name"
            id="character"
            type="text"
            v-model="user.displayName"
            ></v-text-field>
          <v-btn type="submit" :loading="userSaving" color="info">Save Profile</v-btn>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <form>
          <v-text-field
            name="name"
            label="Name"
            id="name"
            type="text"
            v-model="story.name"
            v-on:change="save"
            required></v-text-field>
          <v-text-field
            name="story"
            label="Story"
            id="story"
            type="text"
            v-model="story.story"
            v-on:change="save"
            required></v-text-field>
        </form>
      </v-flex>
      <v-flex xs12 md6>
        <p>{{story.name}}</p>
        <p>{{story.story}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../firebaseInit'
import firebase from 'firebase'

export default {
  data () {
    return {
      loading: true,
      userSaving: false,
      story: {},
      user: {},
    }
  },
  methods: {
    saveUser () {
      this.userSaving = true
      this.$root.$data.user.updateProfile(this.user).then(() => {
        console.log('saved!')
        this.userSaving = false
      }, (error) => {
        console.log(error)
        this.userSaving = false
        // An error happened.
      })
    },
    save () {
      this.story.owner = this.$root.$data.user.uid
      this.story.created = firebase.firestore.FieldValue.serverTimestamp()
      db.collection('stories').doc('aLUwu707mw26ZIH3oIAh').set(this.story)
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },
  },
  created () {
    this.user = this.$root.$data.user
    db.collection('stories').doc('aLUwu707mw26ZIH3oIAh')
      .onSnapshot((doc) => {
        this.story = doc.data()
        var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
        console.log(source, ' data: ', doc.data())
      })
  },
}
</script>
