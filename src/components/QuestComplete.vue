<template>
  <v-list-group
                no-action>
    <v-list-tile slot="activator">

      <v-list-tile-content>
        <v-list-tile-title>{{ quest.name }}</v-list-tile-title>
        <v-list-tile-sub-title>Completed on {{
          quest.dateCompleted.seconds | moment("MMM, Do")}}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <p>All quest details need to go here</p>



    </v-list-tile>
    <v-btn color="grey" class="white--text" @click="$emit('reopen')">Reopen <v-icon class="ml-2" flat>open_in_browser</v-icon></v-btn>
    <v-divider inset></v-divider>
  </v-list-group>
</template>

<script>
export default {
  props: {
    quest: Object
  },
}
</script>
