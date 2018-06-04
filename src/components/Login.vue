<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 v-if="!loggingIn">Sign In</h1>
        <h1 v-if="loggingIn">Welcome back! We're currently logging you in.</h1>
        <v-progress-circular v-if="loggingIn" indeterminate color="primary"></v-progress-circular>        
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3 v-if="!loggingIn">
        <form @submit.prevent="signin">
          <v-layout column>
            <v-flex>
              <p v-if="error">{{error}}</p>
              <p v-if="emailSent" class="text-xs-center success--text">Secret link should be in your inbox! Check there and we'll see you back here in a minute.</p>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                v-if="!emailSent"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn :loading="loading" v-if="!emailSent" color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import router from '../router'
export default {
  data () {
    return {
      error: '',
      loggingIn: false,
      loading: false,
      emailSent: false,
      email: '',
    }
  },
  methods: {
    signin () {
      this.loading = true
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:8080/login',
        // This must be true.
        handleCodeInApp: true,
      }
      firebase.auth().sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          this.loading = false
          this.emailSent = true
          window.localStorage.setItem('emailForSignIn', this.email)
        })
        .catch(error => {
          console.log(error)
          this.loading = true
          this.error = error
          // Some error occurred, you can inspect the code: error.code
        })
    },
  },
  mounted () {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      this.loggingIn = true
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          this.$root.$data.user = result.user
          window.localStorage.removeItem('emailForSignIn')
          router.push('/profile')
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch(function (error) {
          console.log(error)
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        })
    }
  }
}
</script>