<template>
  <div v-if="healthyBackend">
    <Home />
  </div>
  <div v-if="!healthyBackend">
    <div>backend not healthy, not rendering UI</div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      healthyBackend: false
    }
  },
  components: {
    Home
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
