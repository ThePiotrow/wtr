import { handleFileUpload } from '../utils/domUtil';
<script setup lang="ts">
import { domUtil } from '~/utils/domUtil'
import { objUtil } from '~/utils/objectUtil'
import { ModelUser } from '../models/userModel'
import { Model } from '../utils/type'

class FormAuthUser {
  lastname = ''
  firstname = ''
  email = ''
  password = ''
  passwordSecond = ''
}

const state = reactive({
  form: new FormAuthUser(),
})

const fn = {
  onClickSignup() {
    const userModel = ModelUser.make<ModelUser>(state.form)
    if (!userModel) return
    //TODO save in db
    //TODO stock token in pinia
    // TODO redirect to home
  },
}
</script>

<template>
  <div>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input v-model="state.form.lastname" square filled clearable type="text" label="Prénom" />
        <q-input v-model="state.form.firstname" square filled clearable type="text" label="Nom" />

        <q-input v-model="state.form.email" square filled clearable type="email" label="email" />
        <q-input v-model="state.form.password" square filled clearable type="password" label="password" />
        <q-input
          v-model="state.form.passwordSecond"
          square
          filled
          clearable
          type="password"
          label="Confirmer le mot de
      passe"
        />
      </q-form>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn
        @click="fn.onClickSignup"
        unelevated
        color="light-green-7"
        size="lg"
        class="full-width"
        label="Créer un compte"
      />
    </q-card-actions>
  </div>
</template>
