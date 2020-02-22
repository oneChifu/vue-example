<template>
  <div class="main-layout bg-secondary vh-100">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "empty-layout",

  computed: {
    // error() {
    //   return this.$state.getters.error
    // }
  },

  watch: {
    // error(firebaseError) {
    //   console.log(firebaseError)
    // }
  }
};
</script>
