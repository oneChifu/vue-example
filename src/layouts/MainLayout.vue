<template>
  <div class="main-layout min-vh-100">
    <Navbar />

    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "main-layout",

  components: {
    Navbar
  }
};
</script>
