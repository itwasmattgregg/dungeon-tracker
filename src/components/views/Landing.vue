
<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to the D&amp;D Companion App</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <p class=" text-xs-center">
          It's a basic Single Page application <br>
          with Google Firebase authentication
        </p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <v-btn to="/login" v-if="!this.$store.getters.user">Sign In</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {}
</script>
