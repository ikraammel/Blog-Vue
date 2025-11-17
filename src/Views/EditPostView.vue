<template>
  <div class="edit-post-container" v-if="post">
    <h3>Modifier le post</h3>

    <form @submit.prevent="updatePost">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" id="title" v-model="post.title" required />
      </div>

      <div class="form-group">
        <label for="body">Contenu</label>
        <textarea id="body" v-model="post.body" rows="6" required></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags (séparés par des virgules)</label>
        <input type="text" id="tags" v-model="tagsString" />
      </div>

      <button type="submit">Mettre à jour le post</button>
    </form>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>

  <div v-else>
    <p>Chargement du post...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"

const post = ref(null)
const tagsString = ref("")
const successMessage = ref("")
const errorMessage = ref("")

const route = useRoute()
const router = useRouter()
const postId = route.params.id

// Charger le post
const loadPost = async () => {
  try {
    const res = await fetch(`http://localhost:3000/posts/${postId}`)
    post.value = await res.json()
    tagsString.value = post.value.tags.join(", ")
  } catch (err) {
    errorMessage.value = "Impossible de charger le post."
  }
}

onMounted(loadPost)

// Mettre à jour le post
const updatePost = async () => {
  try {
    const updatedPost = {
      ...post.value,
      tags: tagsString.value.split(",").map(tag => tag.trim())
    }

    const res = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost)
    })

    if (!res.ok) throw new Error("Erreur lors de la mise à jour du post")

    successMessage.value = "Post mis à jour avec succès !"
    errorMessage.value = ""

    setTimeout(() => {
      router.push("/posts")
    }, 1000)
  } catch (err) {
    errorMessage.value = err.message
    successMessage.value = ""
  }
}
</script>

<style scoped>
.edit-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

input, textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  resize: vertical;
}

button {
  padding: 8px 15px;
  background: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

button:hover {
  background: #27ae60;
}

.success {
  margin-top: 10px;
  color: #27ae60;
  font-weight: bold;
  text-align: center;
}

.error {
  margin-top: 10px;
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
}
</style>
