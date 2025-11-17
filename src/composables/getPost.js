import { ref, onMounted } from "vue"

export default function getPost(id) {
  const post = ref(null)

  const load = async () => {
    const res = await fetch("http://localhost:3000/posts/" + id)
    post.value = await res.json()
  }

  onMounted(load)

  return { post }
}
