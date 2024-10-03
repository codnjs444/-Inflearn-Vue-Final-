import axios from 'axios'
// axios
const posts = [
  { id: 1, title: '제목1', content: '내용1', createAt: '2021-11-11' },
  { id: 2, title: '제목2', content: '내용2', createAt: '2022-22-22' },
  { id: 3, title: '제목3', content: '내용3', createAt: '2023-33-33' },
  { id: 4, title: '제목4', content: '내용4', createAt: '2024-44-44' },
  { id: 5, title: '제목5', content: '내용5', createAt: '2025-55-55' }
]

export function getPosts() {
  return axios.get('http://localhost:5000/posts')
}

export function getPostByID(id) {
  return axios.get(`http://localhost:5000/posts/${id}`)
}

export function createPost(data) {
  return axios.post('http://localhost:5000/posts', data)
}

export function updatePost(data, id) {
  return axios.put(`http://localhost:5000/posts/${id}`, data)
}

export function deletePost(id) {
  return axios.delete(`http://localhost:5000/posts/${id}`)
}
