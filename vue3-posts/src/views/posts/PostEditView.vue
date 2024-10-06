<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions> </template>
    </PostForm>
    <form @submit.prevent="edit">
      <button class="btn btn-primary me-2">수정</button>
      <button type="button" class="btn btn-outline-danger ma-2" @click="goDetailPage">취소</button>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getPostByID, updatePost } from '@/api/posts.js'
import { ref } from 'vue'

import PostForm from '../../components/posts/PostForm.vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const form = ref({
  title: null,
  content: null
})

const fetchPost = async () => {
  try {
    const { data } = await getPostByID(id)
    setForm(data)
  } catch (error) {
    console.error(error)
  }
}

const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}

fetchPost()

const edit = async () => {
  try {
    await updatePost({ ...form.value }, id)
    router.push({ name: 'PostDetail', params: { id } })
  } catch (error) {
    console.log(error)
  }
}

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } })
</script>

<style lang="scss" scoped></style>
