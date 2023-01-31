<script setup lang="ts">
import { ModelUser } from '~/models/userModel'
import { Api } from '~/services/api'
import { StoreUser } from '../stores/userStore'
const router = useRouter()

class FormAuthSignin {
  email = ''
  password = ''
}
const state = reactive({
  form: new FormAuthSignin(),
})

const fn = {
  async onClickSignin() {
    const userModel = ModelUser.make<ModelUser>(state.form)
    if (!userModel) return

    const { token, user } = await Api.login(userModel)
    if (!token) {
      console.log('token is null')
      return
    }

    StoreUser().setToken(token)
    StoreUser().setUser(user)

    // TODO redirect to home page
    router.push('/')
  },
}
</script>

<template>
  <div>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input v-model="state.form.email" square filled clearable type="email" label="email" />
        <q-input v-model="state.form.password" square filled clearable type="password" label="password" />
      </q-form>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn @click="fn.onClickSignin" color="light-green-7" size="lg" class="full-width" label="Se connecter" />
    </q-card-actions>
  </div>
</template>
