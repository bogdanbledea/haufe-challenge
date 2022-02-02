<template>
  <div class="container">
    <div v-if="!healthyBackend">
      <h1 class="not-healthy-warning">Backend not healthy, not rendering UI</h1>
    </div>
    <div v-if="healthyBackend">
      <nav class="navbar">
        <router-link to="/" class="logo">Haufe Challenge</router-link>
        <div class="links">
          <router-link class="link-item" to="/login">Login</router-link>
          <router-link class="link-item" to="/register">Register</router-link>
          <router-link class="link-item" to="/books">Books</router-link>
          <router-link class="link-item" to="/books">Movies</router-link>
          <router-link class="link-item" to="/books">Songs</router-link>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      healthyBackend: false
    }
  },
  created() {
    // check if backend is healthy
    axios.get('http://localhost:3000/health').then((res) => {
      if(res.status === 200){
        this.healthyBackend = true;
      }
    });
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container{
  padding: 16px;
}
.not-healthy-warning{
  text-align: center;
}

.navbar{
  display:flex;
}
.link-item{
  font-size: 24px;
  margin: 0 16px;
  text-decoration: none;
  color: #2c3e50;
}
.links{
  display:flex;
  justify-content: flex-end;
  flex: 1;
}
.logo{
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  font-size: 24px;
}
</style>
