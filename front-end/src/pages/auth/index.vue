<script setup lang="ts">
import AuthSigninComp from '~/components/AuthSigninComp.vue'

const router = useRouter()

enum EnumTab {
  SCHOOL_DRIVING = 'school-driving',
  STUDENT = 'student',
}

const enum EnumSignupOrLogin {
  SIGNUP = 'signup',
  LOGIN = 'login',
}

const state = reactive({
  signupOrLogin: EnumSignupOrLogin.LOGIN as EnumSignupOrLogin,
  currentTab: EnumTab.STUDENT as EnumTab,
})

const fn = {
  changeToSignupOrLogin() {
    state.signupOrLogin =
      state.signupOrLogin === EnumSignupOrLogin.LOGIN ? EnumSignupOrLogin.SIGNUP : EnumSignupOrLogin.LOGIN
  },
}
</script>

<template>
  <div>
    <q-page class="bg-light-grey window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <h2 class="text-h5 text-white q-my-md">Authentification</h2>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <template v-if="state.signupOrLogin === EnumSignupOrLogin.LOGIN">
              <AuthSigninComp />
            </template>
            <template v-if="state.signupOrLogin === EnumSignupOrLogin.SIGNUP">
              <h2>Créer un compte</h2>
              <AuthSignupComp />
            </template>
            <q-card-section class="text-center q-pa-none">
              <p
                v-if="state.signupOrLogin === EnumSignupOrLogin.LOGIN"
                @click="fn.changeToSignupOrLogin"
                class="text-grey-6"
              >
                Pas encore de compte ? En créer un.
              </p>
              <p
                v-else-if="state.signupOrLogin === EnumSignupOrLogin.SIGNUP"
                @click="fn.changeToSignupOrLogin"
                class="text-grey-6"
              >
                Se connecter à son compte.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style>
.q-card {
  width: 360px;
}
</style>

<route lang="yaml">
meta:
  layout: home
  requiresNotAuth: true
</route>
