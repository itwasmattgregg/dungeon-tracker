<template>
    <div>
     <v-btn
      icon
      :color="buttonColor"
      dark
      fixed
      bottom
      right
      fab
      v-on:click="isVisible = !isVisible"
    > <v-icon :class="{'add-btn-active': isVisible, }">add</v-icon>
    </v-btn>
    <!-- TODO::auto focus on first input once form opens -->
    <transition name="ty-scale">
        <div class="card" v-if="isVisible">
            <slot></slot>
        </div>
    </transition>


    </div>
</template>

<script>
export default {
    name:'FormCard',
    data(){
        return {
            isVisible: false,
        }
    },
    computed: {
        buttonColor(){
            if(!this.isVisible){
                return 'green'
            } else {
                return 'red'
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.card {
    position: fixed;
    bottom: 45px;
    right: 45px;
    min-width: 300px;
    z-index: 3;
    background: white;
    padding: 30px;
    border-radius: 2px;
    box-shadow: -2px 2px 4px rgba(0,0,0,0.2);
  }

.ty-scale-enter-active, .ty-scale-leave-active {
  transition: transform .4s ease-in;
  transform-origin: bottom right;
  transition-timing-function: cubic-bezier(.87,.11,.06,1.24);
}
.ty-scale-enter, .ty-scale-leave-to /* .ty-scale-leave-active below version 2.1.8 */ {
  transform: scale(0);
    transform-origin: bottom right;
}
.add-btn-active{
    transform: rotate(45deg);
    transition: transform .4s ease-out;
    transition-timing-function: cubic-bezier(.87,.11,.06,1.24);

}

</style>
