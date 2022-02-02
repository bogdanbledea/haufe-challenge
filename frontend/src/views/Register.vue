<template>
  <div class="input-container">
    <h2>Register</h2>
    <input v-model="username" class="input" placeholder="Username" type="text" />
    <input v-model="password" class="input" placeholder="Password" type="password" />
    <input v-model="retypePassword" class="input" placeholder="Retype Password" type="password" />
    <button class="submit" @click="login">Register</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        retypePassword: ""
      }
    },
    methods:{
      register: function(){
        let username = this.username;
        let password = this.password;

        this.$store.dispatch('register', { username, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
  }
</script>
<style>
  .input-container{
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .submit{
    cursor: pointer;
    background-color: #3498db;
    border: 0;
    padding: 8px;
    border-radius: 3px;
    color: #fff;
    margin: 10px;
  }
  .input{
    width:300px;
    margin: 10px;
    padding: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .input:focus{
    outline: none;
  }
</style>