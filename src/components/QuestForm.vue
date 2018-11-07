<template>

  <form-card>
    <form class="quest-form"
          v-on:submit.prevent="createQuest">
      <div class="form-grid">
        <div class="left">
          <v-text-field autofocus
                        name="name"
                        label="Quest Name"
                        id="name"
                        type="text"
                        v-model="form.name"
                        required
                        browser-autocomplete />
          <v-combobox v-model="form.location"
                      :items="locations"
                      label="Location"
                      item-text="name"
                      item-value='name'
                      return-object
                      browser-autocomplete
                      required />

           <v-combobox v-model="form.returnTo"
                      :items="people"
                      label="Return To"
                      item-text="name"
                      item-value='name'
                      return-object
                      browser-autocomplete
                      />
          <v-combobox v-model="form.rewards"
                      label="Rewards"
                      hint="Type a reward and hit enter to add"
                      chips
                      deletable-chips
                      multiple></v-combobox>
          <v-btn @click="notesVisible = !notesVisible" v-text="notesBtn"/>
          <v-btn type="submit">Add Quest</v-btn>
        </div>
        <div class="right"
             :class="{'right--closed': !notesVisible}">
          <v-textarea placeholder="Quest notes...."
                      :rows="10"
                      v-model="form.notes"
                      browser-autocomplete
                      autofocus
                      v-if="notesVisible">

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
      form:{
        name: "",
        location: null,
        returnTo: "",
        rewards: "",
        notes: ""
      },
      notesVisible: false,
      locations: [],
      people: []
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
    notesBtn(){
      if (!this.notesVisible) return 'Add Notes'
      return 'Hide Notes'
    }
  },
  firestore() {
    return {
      people: db.collection("people"),
      locations: db.collection("locations")
    }
  },

  methods: {
    closeCard() {
      this.$emit("close")
     console.log('close trig');
     
    },
    createQuest() {

      if(!this.form.location['.key']){
        console.log('added new location');        
        db.collection("locations").add({
          name: this.form.location
        })
      }
      if(!this.form.returnTo['.key']){
        console.log('added person');
        
        db.collection("people").add({
          name: this.form.returnTo
        })
      }

      db.collection("quests")
        .add({
          name: this.form.name,
          location: this.form.location,
          returnTo: this.form.returnTo,
          rewards: this.form.rewards,
          status: "open",
          notes: this.form.notes,
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
     this.form = {}
    }
  }
};
</script>

<style lang="scss" scoped>
.form-grid {
  display: flex;
}
.right {
  width: 50vw;
  margin-left: 20px;
  transition: all 0.2s;
}
.right--closed {
  width: 0vw;
}
</style>

