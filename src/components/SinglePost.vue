<template>
  <div class="single-post">
    <h4>{{ post.title }}</h4>
    <p>{{ post.body }}</p>
    <router-link :to="`/editPost/${post.id}`" class="edit-btn">
      Modifier
    </router-link>
    <router-link :to="`/post/${post.id}`" class="read-more">Read More</router-link>
  </div>
</template>

<script setup>
defineProps({
  post: Object
})
</script>

<style scoped>
.single-post {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.single-post:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
}

.single-post h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.single-post p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.4;
}

.edit-btn {
  margin-top: 10px;
  padding: 6px 12px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-btn:hover {
  background: #2980b9;
}
.read-more {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  padding: 6px 12px;
  background: #2ecc71;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease, transform 0.2s ease;
}

.read-more:hover {
  background: #27ae60;
  transform: translateY(-2px);
}

</style>
