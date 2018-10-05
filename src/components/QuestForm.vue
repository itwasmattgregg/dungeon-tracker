<template>
  <div>
    <form-card>
      <form class="quest-form"
            v-on:submit.prevent="createQuest">
        <v-text-field autofocus
                      ref="name"
                      name="name"
                      label="Name"
                      id="name"
                      type="text"
                      v-model="name"
                      required></v-text-field>
        <v-text-field name="location"
                      label="Location"
                      id="location"
                      type="text"
                      v-model="location"></v-text-field>
        <v-text-field name="returnTo"
                      label="Return To"
                      id="returnTo"
                      type="text"
                      v-model="returnTo"></v-text-field>
        <v-select v-model="rewards"
                  label="Rewards"
                  hint="Type a reward and hit enter to add"
                  chips
                  deletable-chips
                  tags></v-select>
        <v-btn type="submit">Add Quest</v-btn>
      </form>
    </form-card>

  </div>
</template>

<script>
import firebase from "firebase";
import db from "../firebaseInit";
import FormCard from "./FormCard";

export default {
  name: "quest-form",
  components: {
    FormCard
  },
  data() {
    return {
      isVisible: false,
      name: "",
      location: "",
      returnTo: "",
      rewards: ""
    };
  },
  firestore() {
    return {
      people: db.collection("people")
    };
  },
  methods: {
    createQuest() {
      db.collection("people")
        .add({
          name: this.returnTo
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });

      db.collection("quests")
        .add({
          name: this.name,
          location: this.location,
          returnTo: this.returnTo,
          rewards: this.rewards,
          status: "open",
          owner: this.$root.$data.user.uid,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          this.resetFields();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

