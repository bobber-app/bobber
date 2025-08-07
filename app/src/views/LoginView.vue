<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue'
import { useAuth } from '@/composables/useAuth'

const { login, isLoggingIn, loginError } = useAuth()

const credentials = ref({
  username: '',
  password: '',
})

const handleLogin = async () => {
  await login(credentials.value)
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <form @submit.prevent="handleLogin">
        <ion-item>
          <ion-label position="stacked">Username</ion-label>
          <ion-input v-model="credentials.username" type="text" required />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input v-model="credentials.password" type="password" required />
        </ion-item>

        <ion-button type="submit" expand="full" :disabled="isLoggingIn">
          {{ isLoggingIn ? 'Logging in...' : 'Login' }}
        </ion-button>

        <ion-text color="danger" v-if="loginError">
          {{ loginError.message || 'Login failed' }}
        </ion-text>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss"></style>
