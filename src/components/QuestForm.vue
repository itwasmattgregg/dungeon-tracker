<template>
 
    <form-card > 
      <form class="quest-form"
            v-on:submit.prevent="createQuest"
          
          >
        <div class="form-grid">
          <div class="left">
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
                              @keyup.enter.prevent="enterMan">

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
                          multiple></v-combobox>
                          <v-btn @click="addNotes = !addNotes">Add Notes</v-btn>
              <v-btn type="submit">Add Quest</v-btn>
          </div>
          <div class="right" :class="{'right--closed': !addNotes}">
            <v-textarea
            placeholder="Quest notes...."
            :rows="10"
            v-model="notes"
            browser-autocomplete
            autofocus
            v-if="addNotes">

            </v-textarea>
          </div>

        </div>

      </form>
    </form-card>


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
      addNotes: false,
      returnTo: "",
      rewards: "",
      locations: [],
      notes: ""
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    }
  },
  firestore() {
    return {
      people: db.collection("people"),
      locations: db.collection("locations")
    };
  },

  methods: {
    closeCard() {
      this.$emit("close")
     console.log('close trig');
     
    },
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
          notes: this.notes,
          createdBy: this.auth.user.id,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          this.resetFields();
          this.$emit("close");
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
.form-grid {
  display: flex;
}
.right{
  width: 50vw;
  margin-left: 20px;
  transition: all .2s;
}
.right--closed{
  width: 0vw;
}
</style>

