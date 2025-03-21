<script setup lang="ts">
import Logoimg from "@/assets/images/logos/logo.svg";
</script>
<template>
  <div class="logo">
    <nuxt-link to="/">
      <img :src="Logoimg" alt="home" />
    </nuxt-link>
  </div>
</template>
