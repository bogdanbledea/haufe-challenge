<template>
  <nav class="navbar">
    <router-link to="/" class="logo">Haufe Challenge</router-link>
    <div class="links">
      <router-link class="link-item" to="/login">Login</router-link>
      <router-link class="link-item" to="/books">Books</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
