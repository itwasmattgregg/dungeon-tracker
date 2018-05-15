<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Home page</h1>
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

export default {
  data () {
    return {
      story: {},
    }
  },
  methods: {
    save () {
      console.log('started!')
      db.collection('stories').doc('aLUwu707mw26ZIH3oIAh').set({
        name: this.story.name,
        story: this.story.story,
      })
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },
  },
  mounted () {
    db.collection('stories').doc('aLUwu707mw26ZIH3oIAh')
      .onSnapshot((doc) => {
        this.story = doc.data()
        console.log('Current data: ', doc.data())
      })
  },
}
</script>
