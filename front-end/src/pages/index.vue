<script setup lang="ts">
const state = reactive({
  currentTab: 'salons',
})
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
