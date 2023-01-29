<script setup lang="ts">
import { json } from 'stream/consumers'
import { register } from '../services/api'
import axios from 'axios'
const state = reactive({
  currentTab: 'salons',
})

const loadData = async () => {
  // const data = {
  //   email: {
  //     email: 'bgdu08@outlook.fr',
  //     password: '123456',
  //     firstname: 'Benoit',
  //     lastname: 'Dufour',
  //   },
  // }
  // try {
  //   const x = axios
  //     .post('http://localhost:3000/auth/register', {
  //       firstname: 'John',
  //       lastname: 'Doe',
  //       email: 'johndoe@example.com',
  //       password: 'password123',
  //     })
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // } catch (error) {
  //   console.log(error)
  // }
}

loadData()
</script>

<template>
  <div class="row">
    <div class="col-5 flex justify-around" full-height border="teal-900">
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
          <q-card style="height: 100%">
            <q-tabs
              v-model="state.currentTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="salons" label="Salons" />
              <q-tab name="utilisateurs" label="Utilisateurs" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="state.currentTab" animated>
              <q-tab-panel name="salons">
                <div class="text-h6">Salons</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="utilisateurs">
                <div class="text-h6">Utilisateurs</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-7">
      <Chat></Chat>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
