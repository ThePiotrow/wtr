<script setup lang="ts">
const props = defineProps({
  listUser: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 v-for="user in props.listUser" :key="user">
      {{ user }}
    </h2>
  </div>
</template>
