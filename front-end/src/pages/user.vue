<script setup lang="ts">
import { Api } from '~/services/api'
import { StoreUser } from '~/stores/userStore'

const router = useRouter()

const fn = {
  async onClickLogout() {
    socket.emit('disconnect')
    StoreUser().resetUser()
    router.push('/signin')
  },
}

const state = reactive({
  User: StoreUser().getUser(),
})
</script>

<template>
  <div>
    <q-card-section>
      <q-btn @click="fn.onClickLogout" color="light-green-7" size="lg" class="full-width" label="Se déconnecter" />
    </q-card-section>

    <q-card>
      <q-card-section>
        <q-input v-model="state.User.email" square filled clearable type="email" label="email" />
        <q-input v-model="state.User.password" square filled clearable type="password" label="password" />
      </q-card-section>
    </q-card>
  </div>
</template>
