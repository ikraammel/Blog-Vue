import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostList from '../components/PostList.vue' 
import CreatePostView from '../views/CreatePostView.vue' 
import EditPostView from '../views/EditPostView.vue' 
import PostDetailView from "../views/PostDetailView.vue"


const routes = [
  { path: "/", component: Home },
  { path: "/posts", component: PostList },
  { path: "/post/:id", component: PostDetailView },
  { path: "/addPost", component: CreatePostView },
  { path: "/editPost/:id", component: EditPostView },
  { path: "/tags/:tag", component: Home } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
