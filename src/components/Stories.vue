<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Stories</h1>
        <v-btn
          to="add-story">
          Create Story
        </v-btn>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-for="(story, index) in stories" :key="index" color="blue-grey darken-2" class="story-card white--text">
          <v-card-title primary-title>
            <div class="headline mb-0">{{story.name}}</div>
            <div>{{story.story}}</div>
          </v-card-title>
          <v-card-actions v-if="story.owner === $root.$data.user.uid">
            <v-btn flat dark>Edit your story</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '../firebaseInit'

export default {
  data () {
    return {
      stories: []
    }
  },
  computed: {
    currentUser () {
      return this.$root.$data.user.uid
    },
  },
  mounted () {
    db.collection('stories')
      .orderBy('created')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(doc => {
          this.stories.push(doc.data())
        })
      })
  },
}
</script>

<style lang="scss" scoped>
  .story-card {
    .card__title {
      flex-direction: column;
      align-items: start;
    }

    .headline {
      display: block;
    }
  }
</style>
