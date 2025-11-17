import { ref, onMounted } from "vue"

export default function getPosts() {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const res = await fetch('/db.json')  // note le slash : chemin public
      const data = await res.json()
      posts.value = data.posts
    } catch (err) {
      error.value = err.message
    }
  }

  onMounted(load)

  return { posts, error, load }
}
