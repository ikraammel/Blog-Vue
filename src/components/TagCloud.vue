<template>
  <div class="tag-cloud">
    <h3 class="tag-cloud-title">Tags populaires</h3>

    <!-- Loading -->
    <div v-if="!props.posts || props.posts.length === 0" class="loading-tags">
      <div class="tag-skeleton" v-for="n in 5" :key="n"></div>
    </div>

    <!-- Tags -->
    <div v-else class="tags-container">
      <router-link
        v-for="tag in popularTags"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="tag-item"
        :style="{ fontSize: getTagSize(tag.count) }"
      >
        {{ tag.name }}
        <span class="tag-count">({{ tag.count }})</span>
      </router-link>
    </div>

    <!-- Aucun tag -->
    <div v-if="props.posts && props.posts.length > 0 && popularTags.length === 0" class="no-tags">
      <p>Aucun tag disponible</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Recevoir les posts en props
const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

// Calculer les tags populaires
const popularTags = computed(() => {
  if (!props.posts || props.posts.length === 0) return []

  const tagCount = {}
  props.posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 tags
})

// Déterminer la taille du tag selon sa popularité
const getTagSize = (count) => {
  const sizes = ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.375rem']
  const index = Math.min(count - 1, sizes.length - 1)
  return sizes[Math.max(0, index)]
}
</script>

<style scoped>
.tag-cloud {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
  position: sticky;
  top: 100px;
}

.tag-cloud-title {
  color: #2d3748;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
}

.loading-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-skeleton {
  background: #e2e8f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(102, 126, 234, 0.3);
}

.tag-item:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.tag-count {
  font-size: 0.75rem;
  opacity: 0.9;
}

.no-tags {
  text-align: center;
  color: #718096;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .tag-cloud {
    position: static;
    margin-top: 2rem;
  }
}
</style>
