<script setup lang="ts">
import { ModelRoom } from '~/models/roomModel'
const props = defineProps({
  listRoom: {
    type: Array as () => ModelRoom[],
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 v-for="room in props.listRoom" :key="room.id">{{ room.name }} , {{ room.nbMaxUser }} max</h2>
  </div>
</template>
