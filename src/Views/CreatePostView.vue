<template>
  <div class="add-post-container">
    <h3>Ajouter un nouveau post</h3>

    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="body">Contenu</label>
        <textarea id="body" v-model="body" rows="6" required></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags (séparés par des virgules)</label>
        <input type="text" id="tags" v-model="tags" />
      </div>

      <button type="submit">Créer le post</button>
    </form>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const title = ref("")
const body = ref("")
const tags = ref("")
const successMessage = ref("")
const errorMessage = ref("")

const router = useRouter()

const submitPost = async () => {
  const newPost = {
    title: title.value,
    body: body.value,
    tags: tags.value.split(",").map(tag => tag.trim())
  }

  try {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })

    if (!res.ok) throw new Error("Erreur lors de la création du post")

    successMessage.value = "Post créé avec succès !"
    errorMessage.value = ""

    // Rediriger vers la liste des posts après 1s
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
.add-post-container {
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
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

button:hover {
  background: #2980b9;
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
