<script setup lang="ts">
import { ModelRoom } from '~/models/roomModel'

const props = defineProps({
  room: {
    type: Object as () => ModelRoom,
    required: true,
  },
})

const state = reactive({})
</script>

<template>
  <div>
    <Chat />
  </div>
</template>
