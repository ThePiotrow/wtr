<script setup lang="ts"></script>

<template>
  <div>
    <div class="row">
      <div class="col-5 flex justify-around" full-height border="teal-900">
        <h2>Salon</h2>
        <h2>Utilisateurs</h2>
      </div>

      <div class="col-7">
        <Chat></Chat>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: true
</route>
