<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 mb-5>
        <h1>Home page</h1>
        <p v-if="!user.displayName">Please let us know the name of your character.</p>
      </v-flex>
    </v-layout>
    <v-layout justify-center row wrap>
      <v-flex xs12 md6>
        <h2>Edit Profile</h2>
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
          <v-btn type="submit" :loading="userSaving" :color="userSaveSuccess ? 'success' : userSaveFail ? 'error' : 'info'">Save</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      userSaving: false,
      userSaveSuccess: false,
      userSaveFail: false,
      story: {},
      user: {
        displayName: '',
        email: '',
      },
    }
  },
  methods: {
    saveUser () {
      this.userSaving = true
      this.$root.$data.user.updateProfile({
        displayName: this.user.displayName,
        email: this.user.email,
      }).then(() => {
        this.userSaving = false
        this.userSaveSuccess = true
        this.userSaveFail = false
      }, (error) => {
        console.error(error)
        this.userSaving = false
        this.userSaveSuccess = false
        this.userSaveFail = true
      })
    },
  },
  created () {
    this.user.displayName = this.$root.$data.user.displayName
    this.user.email = this.$root.$data.user.email
  },
}
</script>
