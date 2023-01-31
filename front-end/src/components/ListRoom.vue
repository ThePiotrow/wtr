<script setup lang="ts">
import { ModelRoom } from '~/models/roomModel'
import { EnumRole } from '../models/userModel'
import { StoreUser } from '../stores/userStore'
import { ModelUser } from '~/models/userModel'

const props = defineProps({
  listRoom: {
    type: Array as () => ModelRoom[],
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'onEnterRoom', payload: ModelRoom): void
  (event: 'onLeftRoom'): void
}>()

const state = reactive({
  User: {} as ModelUser,
})

const fn = {
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
  joinRoom(room: ModelRoom) {
    emit('onEnterRoom', room)
  },
}

const loadData = async () => {
  state.User = StoreUser().getUser()
}
</script>

<template>
  <div>
    <div v-for="room in props.listRoom" :key="room.id">
      <h2>{{ room.name }} , {{ room.nbMaxUser }} max</h2>
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

      <q-btn @click="fn.joinRoom" color="light-green-7" size="lg" class="full-width" label="Joindre le salon" />
    </div>
  </div>
</template>
