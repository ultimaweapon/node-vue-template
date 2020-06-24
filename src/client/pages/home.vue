<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    message() {
      return this.$store.state.message;
    }
  }
});
</script>
