<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createAt="post.createAt"
          @click="goPage(post.id)"
        >
        </PostItem>
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetail :id="1"></PostDetail>
    </AppCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostItem from '../../components/posts/PostItem.vue'
import PostDetail from '@/views/posts/PostDetailView.vue'
import AppCard from '../../components/AppCard.vue'

import { getPosts } from '@/api/posts'
import { useRouter } from 'vue-router'

const router = useRouter()

const posts = ref([])
const fetchPosts = async() => {


  // 방법 1 [ async 사용 ]
  // const {data} = await getPosts()
  // posts.value = data

  // 방법 2 [ promise 사용]
  // getPosts().then((response) => {
  //   console.log('response', response)
  // }) .catch(error => {
  //   console.log('error:', error)
  // })
}
fetchPosts()

// http://localhost:5173/posts/1?searchText=hello#world!
const goPage = (id) => {
  // router.push(`/posts/${id}`)
  router.push({
    name: 'PostDetail',
    params: {
      id
    },
    query: {
      searchText: 'hello'
    },
    hash: '#world!'
  })
}
</script>

<style lang="scss" scoped></style>
