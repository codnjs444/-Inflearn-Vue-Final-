<template>
  <div>
    <h2>Welcome Home View</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="goAboutPage">about으로 이동</button>
  </div>
  <hr class="my-4" />
  <AppGrid :items="items" v-slot="{ item }">
    <AppCard> {{ item }} </AppCard>
  </AppGrid>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import AppGrid from '../components/AppGrid.vue'
import AppCard from '../components/AppCard.vue'

const router = useRouter()
const goAboutPage = () => {
  router.push('/about')
}
const items = ref(['사과', '딸기', '배', '포도'])
</script>

<style lang="scss" scoped></style>
