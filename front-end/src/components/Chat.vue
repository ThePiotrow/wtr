<script setup lang="ts">
import { cD } from '../utils/objectUtil'
const data = reactive({
  ListChatMessage: [
    {
      name: 'me',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      text: ['hey, how are you?', 'IAM FINE?'],
      sent: true,
      stamp: '7 minutes ago',
    },
    {
      name: 'Jane',
      avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
      text: [`doing fine, how r you?`],
      stamp: '4 minutes ago',
      sent: false,
    },
  ],
})
const state = reactive({
  messageToSend: '',
})

const fn = {
  onEnterMessageToSend() {
    data.ListChatMessage.push({
      name: 'me',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      text: [cD(state.messageToSend)],
      sent: true,
      stamp: 'just now',
    })
    state.messageToSend = ''
  },
}
</script>

<template>
  <div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          v-for="message in data.ListChatMessage"
          :key="message.name"
          :name="message.name"
          :avatar="message.avatar"
          :text="message.text"
          :sent="message.sent"
          :stamp="message.stamp"
        />
      </div>
    </div>
    <q-input v-model="state.messageToSend" @keyup.enter="fn.onEnterMessageToSend" filled label="Filled" />
  </div>
</template>
