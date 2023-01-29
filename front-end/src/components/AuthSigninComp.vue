<script setup lang="ts">
import { ModelUser } from '~/models/userModel'

const emit = defineEmits<{
  (e: 'signin', val: FormAuthSignin): void
}>()

class FormAuthSignin {
  email = ''
  password = ''
}
const state = reactive({
  form: new FormAuthSignin(),
})

const fn = {
  onClickSignin() {
    const userModel = ModelUser.make<ModelUser>(state.form)
    if (!userModel) return
    //TODO coonection in db
    //TODO stock token in pinia
    // TODO redirect to home
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
