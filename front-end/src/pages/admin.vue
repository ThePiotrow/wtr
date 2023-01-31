<script setup lang="ts">
import { ModelUser } from '../models/userModel'

const state = reactive({
  ListWaitingCommunication: [] as ModelUser[],
  commercialNotification: '',
})

const fn = {
  acceptAskCommunication() {
    //TODO: accepter demande de communication
    console.log('accepter demande de communication')
  },
  refuseAskCommunication() {
    //TODO refuser demande de communication
    console.log('refuser demande de communication')
  },
  setAvailable() {
    //TODO se mettre dispo pour communiquer avec clients
    console.log('se mettre dispo pour communiquer avec clients')
  },
  emitCommercialNotification() {
    //TODO émettre des notifications commerciales
    console.log('émettre des notifications commerciales')
  },
}

const loadData = async () => {
  // state.ListUser = Api.fetchAll('users')
  // state.ListRoom = Api.fetchAll('rooms')
}

loadData()
</script>

<template>
  <div>
    <q-btn
      @click="fn.setAvailable"
      color="light-green-7"
      size="lg"
      class="full-width"
      label="Se mettre dispo pour communiquer avec clients"
    />

    <q-card
      style="height: 100%"
      v-for="waitingCommunication in state.ListWaitingCommunication"
      :key="waitingCommunication.id"
    >
      <q-btn
        @click="fn.acceptAskCommunication"
        color="light-green-7"
        size="lg"
        class="full-width"
        label="Accepter demande de communication"
      />
      <q-btn
        @click="fn.refuseAskCommunication"
        color="light-green-7"
        size="lg"
        class="full-width"
        label="Refuser demande de communication"
      />
    </q-card>

    <q-card style="height: 100%">
      <ListRoom :listRoom="state.ListRoom"></ListRoom>
    </q-card>

    <div class="q-pa-md">
      <q-input v-model="state.commercialNotification" filled type="textarea" />
    </div>
    <q-btn
      @click="fn.emitCommercialNotification"
      color="light-green-7"
      size="lg"
      class="full-width"
      label="Émettre une
    notification commerciale"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
  requiresAdmin: true
</route>
