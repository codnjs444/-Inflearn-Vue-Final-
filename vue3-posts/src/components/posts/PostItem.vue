<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">
      {{ createAt }}
    </p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { defineEmits } from 'vue'

// Props 정의
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  createAt: {
    type: [String, Date, Number]
  }
})

// emits를 배열 형태로 정의
defineEmits(['modal'])
</script>

<style lang="scss" scoped></style>
