<script setup lang="ts">
import type { ModelUser } from '~/models/userModel'

const props = defineProps({
  listUser: {
    type: Array as () => ModelUser[],
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 v-for="user in props.listUser" :key="user.id">{{ user.firstname }} {{ user.lastname }}</h2>
  </div>
</template>
