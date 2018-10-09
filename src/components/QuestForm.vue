<template>
  <div>
    <form-card>
      <form class="quest-form"
            v-on:submit.prevent="createQuest">
        <v-text-field autofocus
                      name="name"
                      label="Quest Name"
                      id="name"
                      type="text"
                      v-model="name"
                      required></v-text-field>
        <v-autocomplete v-model="location"
                        :items="locations"
                        label="Location"
                        item-text="name"
                        item-value='name'
                        no-data-text="Hit enter to save"
                        return-object
                        clearable
                        clear-icon="fa-times"
                        browser-autocomplete
                        required
                        >
          
        </v-autocomplete>
        <v-text-field name="returnTo"
                      label="Return To"
                      id="returnTo"
                      type="text"
                      required
                      v-model="returnTo"></v-text-field>
        <v-combobox v-model="rewards"
                    label="Rewards"
                    hint="Type a reward and hit enter to add"
                    chips
                    deletable-chips
                    multiple
                   ></v-combobox>
        <v-btn  type="submit">Add Quest</v-btn>
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
      name: "",
      location: null,
      returnTo: "",
      rewards: "",
      locations: []
    };
  },
  computed:{
    auth(){
      return this.$store.state.auth
    }
  },
  firestore() {
    return {
      people: db.collection("people"),
      locations: db.collection("locations")
    };
  },

  methods: {
    createQuest() {
      //TODO::Only add if doesn't exist 
      //db.collection("people")
      //   .add({
      //     name: this.returnTo
      //   })
      //   .catch(error => {
      //     console.error("Error adding document: ", error);
      //   });

      db.collection("quests")
        .add({
          name: this.name,
          location: this.location,
          returnTo: this.returnTo,
          rewards: this.rewards,
          status: "open",
          createdBy: this.auth.user.id,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          this.resetFields();
          this.$emit('close')
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
  }
};
</script>

<style lang="scss" scoped>
</style>

