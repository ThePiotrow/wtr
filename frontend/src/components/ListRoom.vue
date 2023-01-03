<script setup lang="ts">
const props = defineProps({
  listRoom: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 v-for="room in props.listRoom" :key="room">
      {{ room }}
    </h2>
  </div>
</template>
