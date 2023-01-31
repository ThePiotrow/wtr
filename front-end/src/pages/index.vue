<script setup lang="ts">
import { EnumRole, ModelUser } from '../models/userModel'
import { Api } from '~/services/api'
import { ModelRoom } from '~/models/roomModel'
import { io } from 'socket.io-client'
import { ModelMessage } from '~/models/messageModel'
import { StoreUser } from '~/stores/userStore'
const socket = io()

const state = reactive({
  currentTab: 'salons',
  ListUser: [] as ModelUser[],
  ListRoom: [] as ModelRoom[],
  CurrentRoom: null as ModelRoom | null,
  CurrentListMessage: [] as ModelMessage[],
})

const loadData = async () => {
  // state.ListUser = Api.fetchAll('users')
  // state.ListRoom = Api.fetchAll('rooms')
  state.ListUser = [
    ModelUser.make<ModelUser>({
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: EnumRole.USER,
      fkRooms: [],
      fkMessages: [],
      isConfirmed: false,
      id: 333,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]

  state.ListRoom = [
    ModelRoom.make<ModelRoom>({
      name: 'Salon 1',
      fkUsers: [],
      fkMessages: [],
      nbMaxUser: 10,
      id: 3333,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]
}

const fn = {
  setCurrentRoom(room: ModelRoom) {
    socket.emit('enter_room', room.id)
    state.CurrentRoom = room
  },
  sendMessage(message: ModelMessage) {
    socket.emit('chat_message', { message, room: state.CurrentRoom.id, token: StoreUser().getToken() })
  },

  resetCurrentRoom() {
    state.CurrentRoom = null
    state.CurrentListMessage = []
  },
  onClickAskAdvisor() {
    //TODO: ask an available advisor
  },
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
              <q-tab name="advisor" label="Conseiller" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="state.currentTab" animated>
              <q-tab-panel name="salons">
                <ListRoom
                  :listRoom="state.ListRoom"
                  @on-enter-room="fn.setCurrentRoom"
                  @on-left-room="fn.resetCurrentRoom"
                />
              </q-tab-panel>

              <q-tab-panel name="utilisateurs">
                <ListUser :listUser="state.ListUser"></ListUser>
              </q-tab-panel>

              <q-tab-panel name="advisor">
                <q-btn
                  @click="fn.onClickAskAdvisor"
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="Parler à un conseiller"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-7">
      <template v-if="state.CurrentRoom">
        <Chat :list-message="state.CurrentListMessage" @on-sending-message="sendMessage"> </Chat>
      </template>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
