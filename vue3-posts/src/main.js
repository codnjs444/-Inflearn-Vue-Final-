import 'bootstrap/dist/css/bootstrap.min.css' // 외부 CSS 라이브러리
import 'bootstrap/dist/js/bootstrap.js' // 외부 JavaScript 라이브러리

import { createApp } from 'vue' // Vue.js 관련 import
import App from './App.vue' // 메인 Vue 컴포넌트
import router from './router' // router/index.js 파일 경로

createApp(App).use(router).mount('#app') // 애플리케이션 초기화 및 마운트

console.log('MODE:', import.meta.env.MODE)
console.log('BASE_URL:', import.meta.env.BASE_URL)
console.log('PROD:', import.meta.env.PROD)
console.log('DEV:', import.meta.env.DEV)
console.log('VITE_APP_API_URL:', import.meta.env.VITE_APP_API_URL)
