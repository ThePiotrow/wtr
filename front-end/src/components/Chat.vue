<script setup lang="ts">
import { ModelMessage } from '~/models/messageModel'
import { ModelRoom } from '~/models/roomModel'
import { StoreUser } from '~/stores/userStore'
import { cD } from '../utils/objectUtil'
import { AnyObject } from '../utils/type'

import { io } from 'socket.io-client'

const socket = io()

const emit = defineEmits<{
  (event: 'onSendingMessage', payload: string): void
}>()

class ChatMessageClass {
  name = ''
  text = ''
  sent = true
  stamp = Date.now()

  constructor(obj: AnyObject) {
    this.name = obj.name
    this.text = obj.text
    this.sent = obj.sent
    this.stamp = obj.stamp
  }

  toModelMessage() {
    return ModelMessage.make<ModelMessage>({
      content: this.text,
      createdAt: this.stamp,
      fkSender: {
        firstname: this.name.split(' ')[0],
        lastname: this.name.split(' ')[1],
      },
    })
  }
}

const state = reactive({
  messageToSend: '',
  ListChatMessage: [] as ChatMessageClass[],
})

socket.on('init_messages', (ListMessage: ModelMessage[]) => {
  state.ListChatMessage = state.ListChatMessage.reduce((acc, message) => {
    return [...acc, ...fn.transformMessage(message)]
  }, state.ListChatMessage)
})

socket.on('received_message', (message: ModelMessage) => {
  state.ListChatMessage.push(fn.transformMessage(message))
})

const fn = {
  onEnterMessageToSend() {
    emit('onSendingMessage', state.messageToSend)
    state.messageToSend = ''
  },

  transformMessage(Message: ModelMessage) {
    return new ChatMessageClass({
      name: Message.fkSender.firstname + ' ' + Message.fkSender.lastname,
      text: Message.content,
      sent: true,
      stamp: Message.createdAt,
    })
  },
}
</script>

<template>
  <div>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          v-for="message in state.ListChatMessage"
          :key="message"
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
