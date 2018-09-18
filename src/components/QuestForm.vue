<template>
  <div>
    <v-btn
      icon
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      v-on:click="isVisible = !isVisible"
    >
      <v-icon :class="{'add-btn-active': isVisible}">add</v-icon>
    </v-btn>
    <transition name="slide-up">
      <form v-if="isVisible" class="quest-form" v-on:submit.prevent="createQuest">
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
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseInit'

export default {
  name: 'quest-form',
  data () {
    return {
      isVisible: false,
      name: '',
      location: '',
      returnTo: '',
      rewards: '',
    }
  },
  firestore () {
    return {
      people: db.collection('people'),
    }
  },
  methods: {
    createQuest () {
      db.collection('people').add({
        name: this.returnTo,
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })

      db.collection('quests').add({
        name: this.name,
        location: this.location,
        returnTo: this.returnTo,
        rewards: this.rewards,
        status: 'open',
        owner: this.$root.$data.user.uid,
        created: firebase.firestore.FieldValue.serverTimestamp()
      }).then((docRef) => {
        this.resetFields()
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    },
    resetFields () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
  },
}
</script>

<style lang="scss" scoped>
  .add-btn-active {
    transform: rotate(45deg);
  }
  .quest-form {
    position: fixed;
    bottom: 45px;
    right: 45px;
    width: 300px;
    z-index: 3;
    background: white;
    padding: 30px;
    border-radius: 2px;
    box-shadow: -2px 2px 4px rgba(0,0,0,0.2);
    &.slide-up-enter-active, &.slide-up-leave-active {
      transition: opacity .5s, bottom .5s;
    }
    &.slide-up-enter, &.slide-up-leave-to {
      opacity: 0;
      bottom: 0;
    }
  }
</style>

