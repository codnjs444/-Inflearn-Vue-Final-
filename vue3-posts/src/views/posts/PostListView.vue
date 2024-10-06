<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <hr class="my-4" />

    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :createAt="item.createAt"
          @click="goPage(item.id)"
          @modal="openModal(item)"
        >
        </PostItem>
      </template>
    </AppGrid>

    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4"></div>
    </div>

    <AppPagination
      :currentPage="params._page"
      :pageCount="pageCount"
      @page="(page) => (params._page = page)"
    />
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>
    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetail :id="posts[0].id" />
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import PostItem from '../../components/posts/PostItem.vue'
import PostDetail from '@/views/posts/PostDetailView.vue'
import PostFilter from '../../components/posts/PostFilter.vue'
import PostModal from '../../components/posts/PostModal.vue'

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
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
)

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value) // async/await 방식
    // console.log('params:', params.value) // 쿼리 파라미터 확인

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
// modal
const show = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalCreatedAt = ref('')

const openModal = ({ title, content, createdAt }) => {
  show.value = true
  modalTitle.value = title
  modalContent.value = content
  modalCreatedAt.value = createdAt
}
const closeModal = () => (show.value = false)
</script>

<style lang="scss" scoped></style>
