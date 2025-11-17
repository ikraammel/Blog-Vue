<template>
  <div class="post-detail-container">
    <div v-if="loading" class="loading">
      Chargement du post...
    </div>

    <div v-else-if="post" class="post-detail">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>

      <div v-if="post.tags?.length" class="tags-container">
        <router-link
          v-for="tag in post.tags"
          :key="tag"
          :to="`/tags/${tag}`"
          class="tag-item"
        >
          {{ tag }}
        </router-link>
      </div>

      <router-link to="/" class="back-button">← Retour aux posts</router-link>
    </div>

    <div v-else class="not-found">
      <p>Post non trouvé.</p>
      <router-link to="/" class="back-button">← Retour aux posts</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import getPosts from "../composables/getPosts.js"

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const { posts, load } = getPosts()

onMounted(async () => {
  loading.value = true
  await load() // charge tous les posts depuis le composable
  post.value = posts.value.find(p => p.id === route.params.id)
  loading.value = false
})
</script>

<style scoped>
.post-detail-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.loading {
  text-align: center;
  font-size: 1rem;
  color: #718096;
  padding: 50px 0;
}

.post-detail h2 {
  margin-bottom: 15px;
  color: #2d3748;
}

.post-detail p {
  line-height: 1.6;
  color: #4a5568;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 15px;
}

.tag-item {
  background: #667eea;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.85rem;
}

.tag-item:hover {
  background: #5a67d8;
}

.back-button {
  display: inline-block;
  margin-top: 25px;
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.not-found {
  text-align: center;
  color: #e53e3e;
  font-weight: bold;
  padding: 50px 0;
}
</style>
