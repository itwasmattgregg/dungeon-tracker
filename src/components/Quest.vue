<template>
  <div class="quest">
    <v-card color="teal" class="white--text">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs3>
            <v-card-media
              src="/static/doc-images/cards/halcyon.png"
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
          <v-flex xs9>
            <div>
              <div v-if="!editing" class="headline">{{quest.name}}</div>
              <v-text-field
                v-if="editing"
                name="name"
                label="Quest Name"
                id="name"
                type="text"
                v-model="quest.name"
              ></v-text-field>
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
          v-on:click="editing = false"
        >
          save
        </v-btn>
        <v-btn icon>
          <v-icon>check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
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
}
</script>

<style lang="scss" scoped>
  .quest {
    text-align: left;
  }

  .actions {
    background-color: #fff;
  }

  .rewards-list {
    background-color: transparent;
    color: #fff;
  }
</style>
