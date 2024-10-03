<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent="">
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
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
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !(params._page > 1) }">
          <a class="page-link" href="#" @click.prevent="params._page--" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !(params._page < pageCount) }">
          <a class="page-link" href="#" @click.prevent="params._page++" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <hr class="my-5" />
    <AppCard>
      <PostDetail :id="1"></PostDetail>
    </AppCard>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import PostItem from '../../components/posts/PostItem.vue'
import PostDetail from '@/views/posts/PostDetailView.vue'
import AppCard from '../../components/AppCard.vue'

import { getPosts } from '@/api/posts'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([])

const params = ref({
  _sort: '-createdAt',
  _page: 1,
  _limit: 3,
  title_like: ''
})

// pagination
const totalCount = ref(0)
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value) // async/await 방식
    console.log('params:', params.value) // 쿼리 파라미터 확인

    posts.value = data
    totalCount.value = headers['x-total-count']
  } catch (error) {
    console.error(error)
  }

  // 방법 1 [ async/await 사용 ]
  // const { data } = await getPosts(params.value)
  // posts.value = data

  // 방법 2 [ promise 사용 ]
  // getPosts(params.value).then((response) => {
  //   posts.value = response.data
  // }).catch((error) => {
  //   console.log('error:', error)
  // })

  // 방법 3 [ 객체 구조 분해 할당 방식으로 바로 주입 ]
  // ({ data: posts.value } = await getPosts(params.value))
}
watchEffect(fetchPosts)
// fetchPosts()

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
