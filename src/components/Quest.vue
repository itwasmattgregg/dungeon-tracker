<template>
  <div class="quest">
    <v-card dark>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs12>
            <div v-if="!editing">
              <div class="headline">{{quest.name}}</div>
              <p>Location: {{quest.location}}</p>
              <p>Return to: {{quest.returnTo}}</p>
              <p>Rewards:
                <v-list dense class="rewards-list">
                  <v-list-tile v-for="(reward, index) in quest.rewards" :key="index">
                    <v-list-tile-content>
                      <v-list-tile-title>{{reward}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </p>
              <p>Created {{formattedTime}}</p>
            </div>
            <div v-else>
              <v-text-field
                name="name"
                label="Quest Name"
                id="name"
                type="text"
                dark
                v-model="quest.name"
              ></v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                type="text"
                dark
                v-model="quest.location"
              ></v-text-field>
              <v-text-field
                name="return-to"
                label="Return To (Person)"
                id="return-to"
                type="text"
                dark
                v-model="quest.returnTo"
              ></v-text-field>
              <v-select
                v-model="quest.rewards"
                label="Rewards"
                hint="Type a reward and hit enter to add"
                chips
                deletable-chips
                tags
              ></v-select>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="actions">
        <v-spacer></v-spacer>
        <v-btn
          icon
          v-if="!editing"
          v-on:click="editing = true"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          v-if="editing"
          v-on:click="saveQuest"
        >
          save
        </v-btn>
        <v-btn
          icon
          v-on:click="$emit('complete-quest')"
        >
          <v-icon>check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import db from '../firebaseInit'
import omit from 'lodash/omit'

export default {
  name: 'quest',
  data () {
    return {
      editing: false,
    }
  },
  props: {
    quest: {
      type: Object,
      default: {},
    }
  },
  computed: {
    formattedTime () {
      if (this.quest.created) {
        return moment(this.quest.created.seconds * 1000).fromNow()
      }
    }
  },
  methods: {
    saveQuest () {
      const questToSave = omit(this.quest, '.key')
      db.collection('quests').doc(this.quest['.key']).update(questToSave).then(() => {
        this.editing = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .quest {
    text-align: left;
  }

  // .actions {
  //   background-color: #fff;
  // }

  // .rewards-list {
  //   background-color: transparent;
  //   color: #fff;
  // }
</style>
