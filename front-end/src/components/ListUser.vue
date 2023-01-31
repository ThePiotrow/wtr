<script setup lang="ts">
import type { ModelUser } from '~/models/userModel'

const props = defineProps({
  listUser: {
    type: Array as () => ModelUser[],
    required: true,
  },
})

const fn = {
  contactUser() {
    console.log('click on user')
    //TODO contact user backend if available
  },
}
</script>

<template>
  <div>
    <h2 v-for="user in props.listUser" :key="user.id" @click="fn.contactUser">
      {{ user.firstname }} {{ user.lastname }}
    </h2>
  </div>
</template>
