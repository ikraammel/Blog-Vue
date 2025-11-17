<template>
  <div class="post-list-layout">
    <div class="posts-column">
      <h3>Liste des posts</h3>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="posts-grid">
        <SinglePost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>

    <aside class="sidebar">
      <TagCloud :posts="posts" />
    </aside>
  </div>
</template>

<script setup>
import SinglePost from './SinglePost.vue'
import TagCloud from './TagCloud.vue'
import getPosts from '../composables/getPosts.js'

const { posts, error, load } = getPosts()
load()
</script>

<style scoped>
.post-list-layout {
  display: flex;
  gap: 20px;
}

/* Colonne principale des posts */
.posts-column {
  flex: 3;
}

/* Sidebar des tags */
.sidebar {
  flex: 1;
  min-width: 200px;
}

/* Grid pour les posts */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
