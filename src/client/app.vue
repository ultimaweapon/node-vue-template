<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: function () {
    return {
      message: 'Hello, world!'
    }
  }
});
</script>
