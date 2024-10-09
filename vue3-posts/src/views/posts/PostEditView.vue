<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger ma-2"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else>수정</template>
        </button>
      </template>
    </PostForm>
    <!-- <AppAlert
      :show="showAlert"
      :message="alertMessage"
      :type="alertType || 'error'"
    /> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getPostByID, updatePost } from '@/api/posts.js'
import { ref } from 'vue'

import PostForm from '../../components/posts/PostForm.vue'

import { useAlert } from '../../composables/alert'

const { vSuccess } = useAlert()

const router = useRouter()
const route = useRoute()
const id = route.params.id

const error = ref(null)
const loading = ref(false)

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  try {
    loading.value = true
    const { data } = await getPostByID(id)
    setForm(data)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}

fetchPost()

const editError = ref(null)
const editLoading = ref(false)
const edit = async () => {
  try {
    editLoading.value = true
    await updatePost({ ...form.value }, id)
    vSuccess('수정이 완료되었습니다.')
    router.push({ name: 'PostDetail', params: { id } })
  } catch (err) {
    console.error(err)
    editError.value = err
  } finally {
    editLoading.value = false
  }
}

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } })

// // const showAlert = ref(false)
// // const alertMessage = ref('')
// // const alertType = ref('')
// const alerts = ref([])
// const vAlert = (message, type = 'error') => {
//   alerts.value.push({ message, type })
//   // showAlert.value = true
//   // alertMessage.value = message
//   // alertType.value = type
//   setTimeout(() => {
//     // showAlert.value = false
//     alerts.value.shift()
//   }, 2000)
// }
// const vSuccess = (message) => vAlert(message, 'success')
</script>

<style lang="scss" scoped></style>
