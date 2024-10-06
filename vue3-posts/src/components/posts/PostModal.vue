<template>
  <AppModal v-model="show" :show="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">내용</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3 text-muted">등록일</div>
        <div class="col-9">{{ createdAt }}</div>
      </div>
    </template>
    <template #actions>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        닫기
      </button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue'
import AppModal from '../../components/AppModal.vue'

// Props 정의
const props = defineProps({
  modalValue: Boolean,
  title: String,
  content: String,
  createdAt: [String, Number]
})

// Emits 정의
const emit = defineEmits(['update:modelValue'])

// 로컬 상태인 show 정의
const show = computed({
  get() {
    return props.modalValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// Modal 닫기 함수
const closeModal = () => {
  show.value = false
}
</script>

<style lang="scss" scoped></style>
