<script setup lang="ts">
import { ModelMessage } from '~/models/messageModel'
import { cD } from '../utils/objectUtil'
import { AnyObject } from '../utils/type'

const props = defineProps({
  listMessage: {
    type: Array as () => ModelMessage[],
    required: true,
  },
})

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

const fn = {
  onEnterMessageToSend() {
    const ChatMessage = new ChatMessageClass({
      name: StoreUser().getUser().firstname + ' ' + StoreUser().getUser().lastname,
      text: state.messageToSend,
      sent: true,
      stamp: Date.now(),
    })

    const Message = ChatMessage.toModelMessage()

    //TODO send message to backend

    state.messageToSend = ''
  },

  transformMessage(Message: ModelMessage) {
    return new ChatMessage({
      name: Message.fkSender.firstname + ' ' + Message.fkSender.lastname,
      text: Message.content,
      sent: true,
      stamp: Message.createdAt,
    })
  },
}

const loadData = async () => {
  state.ListChatMessage = props.listChatMessage.map((message) => fn.transformMessage(message))
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
