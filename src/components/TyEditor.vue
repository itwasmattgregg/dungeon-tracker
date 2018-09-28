<template>
  <!-- Include stylesheet -->

  <!-- Create the editor container -->
  <div id="editor">
    <p>Hello World!</p>
    <p>Some initial
      <strong>bold</strong> text</p>
    <p><br></p>
  </div>

  <!-- Include the Quill library -->

</template>


<script>
import Quill from "quill";

export default {
  name: "TyEditor",
  components: {},
  data() {
    return {};
  },
  computed: {
    editor() {
      var quill = new Quill("#editor", {
        theme: "snow"
      });
    }
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
</style>




