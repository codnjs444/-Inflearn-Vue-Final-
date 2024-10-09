<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage(post.id)">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getPostByID, deletePost } from '@/api/posts.js'
import { ref } from 'vue'

const props = defineProps({
  id: [String, Number]
})

const router = useRouter()
// const route = useRoute()
// const id = route.params.id

const post = ref({})

const fetchPost = async () => {
  try {
    const { data } = await getPostByID(props.id)
    setPost(data)
  } catch (error) {
    console.log(error)
  }
}

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}

fetchPost()

const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) {
      return
    }
    await deletePost(props.id)
    router.push({ name: 'PostList' })
  } catch (error) {
    console.log(error)
  }
}

const goListPage = () => {
  router.push({
    name: 'PostList'
  })
}

const goEditPage = (id) => {
  router.push({
    name: 'PostEdit',
    params: { id }
  })
}
</script>

<style lang="scss" scoped></style>
