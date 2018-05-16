<template>
  <form>
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
    <v-btn type="submit">Add Quest</v-btn>
  </form>
</template>

<script>
export default {
  name: 'quest-form',
  data () {
    return {
      name: '',
      location: '',
    }
  },
}
</script>

<style>

</style>
