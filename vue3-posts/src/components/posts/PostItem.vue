<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">
      {{ createdDate }}
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
import { computed, defineEmits, inject } from 'vue'
const dayjs = inject('dayjs')

// Props 정의
const props = defineProps({
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
const createdDate = computed(() =>
  dayjs(props.createAt).format('YYYY.MM.DD HH:mm:ss')
)
</script>

<style lang="scss" scoped></style>
