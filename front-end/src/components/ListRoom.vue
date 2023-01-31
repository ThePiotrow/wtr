<script setup lang="ts">
import { ModelRoom } from '~/models/roomModel'
import { EnumRole } from '../models/userModel'
import { StoreUser } from '../stores/userStore'

const props = defineProps({
  listRoom: {
    type: Array as () => ModelRoom[],
    required: true,
  },
})

const state = reactive({
  User: {} as ModelUser,
})

const fn = {
  contactUser() {
    console.log('click on user')
    //TODO contact user backend if available
  },
  createRoom() {
    //TODO créer un salon de discussion
    console.log('créer un salon de discussion')
  },
  modifyRoom() {
    //TODO modifier un salon de discussion
    console.log('modifier un salon de discussion')
  },
  deleteRoom() {
    //TODO supprimer un salon de discussion
    console.log('supprimer un salon de discussion')
  },
  joinRoom() {
    //TODO rejoindre un salon de discussion
    console.log('rejoindre un salon de discussion')
  },
}

const loadData = async () => {
  // state.User = StoreUser().getUser()
  state.User = {
    role: EnumRole.ADMIN,
  }
}
</script>

<template>
  <div>
    <div v-for="room in props.listRoom" :key="room.id" @click="fn.contactUser">
      <h2 v-for="room in props.listRoom" :key="room.id" @click="fn.contactUser">
        {{ room.name }} , {{ room.nbMaxUser }} max
      </h2>
      <div v-if="state.User.role === EnumRole.ADMIN">
        <q-btn
          @click="fn.createRoom"
          color="light-green-7"
          size="lg"
          class="full-width"
          label="Créer un salon de discussion"
        />
        <q-btn
          @click="fn.modifyRoom"
          color="light-green-7"
          size="lg"
          class="full-width"
          label="Modifier un salon de discussion"
        />
        <q-btn
          @click="fn.deleteRoom"
          color="light-green-7"
          size="lg"
          class="full-width"
          label="Supprimer un salon de discussion"
        />
      </div>

      <div v-if="state.User.role === EnumRole.USER">
        <q-btn
          @click="fn.joinRoom"
          color="light-green-7"
          size="lg"
          class="full-width"
          label="Créer un salon de discussion"
        />
      </div>
    </div>
  </div>
</template>
