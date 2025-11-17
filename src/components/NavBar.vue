<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/addPost">Ajouter un post</router-link>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 15px;
  background: #3498db;
  border-radius: 8px;
  margin-bottom: 25px;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

nav a.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid #fff;
}

nav a:hover {
  color: #f1c40f;
}
</style>
