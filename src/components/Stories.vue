<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Stories</h1>
     <story-form/>
       

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="(story, index) in stories" :key="index">
        <v-card mb-3 color="blue-grey darken-2" class="story-card white--text">
          <v-card-title primary-title>
            <div class="headline mb-0">{{story.name}}</div>
            <div>{{story.story}}</div>
          </v-card-title>
          <v-card-actions v-if="story.owner === user.id">
            <v-btn flat dark>Edit your story</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseInit'
import { mapGetters } from 'vuex'
import storyForm from './StoryForm.vue'

export default {
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  firestore () {
    return {
      stories: db.collection('stories')
    }
  },
  firestore () {
    return {
      stories: db.collection('stories'),
    }
  },
  components: {
    storyForm
  },
  computed: {
    currentUser () {
      return this.$root.$data.user.uid
    },
  },
  mounted () {
   
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
