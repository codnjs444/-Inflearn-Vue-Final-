import { posts } from '.'
// axios

export function getPosts(params) {
  return posts.get('/', { params })
}

export function getPostByID(id) {
  return posts.get(`/${id}`)
}

export function createPost(data) {
  return posts.post('', data)
}

export function updatePost(data, id) {
  return posts.put(`/${id}`, data)
}

export function deletePost(id) {
  return posts.delete(`/${id}`)
}
