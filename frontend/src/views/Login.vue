<template>
  <div class="input-container">
    <h2>Login</h2>
    <custom-input placeholder="Username..." :error="errors.username" name="username" :value="username" type="text" :onInput="onInput" />
    <custom-input placeholder="Password..." :error="errors.password" name="password" :value="password" type="password" :onInput="onInput"/>
    
    <custom-button buttonText="Login" :onSubmit="login" :disabled="isSubmitDisabled" />
  </div>
</template>
<script>
import CustomInput from '../components/CustomTextInput.vue'
import CustomButton from '../components/CustomButton.vue'
  export default {
    components: { CustomInput, CustomButton },
    data() {
      return {
        username: "",
        password: "",
        validators: {
          username: {
            required: true,
            touched: false,
            error: undefined
          },
          password: {
            required: true,
            touched: false,
            error: undefined
          }
        }
      }
    },
    methods:{
      isFieldWithError: function(fieldName){
        return this.validators[fieldName].touched && this.validators[fieldName].required && this[fieldName].length === 0
      },
      onInput: function(e){
        const fieldName = e.fieldName;
        const value = e.value;
        if(fieldName){
          this[fieldName] = value;
          this.validators[fieldName].touched = true;
        }
        
      },
      login: function(){
        let username = this.username;
        let password = this.password;

        this.$store.dispatch('login', { username, password })
          .then(() => {
            this.$toast.success('You have been logged in.');
            this.$router.push('/');
          })
          .catch(() => {
            this.$toast.error('The login could not be completed.');
          })
      }
    },
    computed: {
      isSubmitDisabled: function(){
        if(!this.username || !this.password){
          return true;
        }
        return false;
      },
      errors: function() {
        return {
          username: this.isFieldWithError('username') ? 'Username is required' : undefined,
          password: this.isFieldWithError('password') ? 'Password is required' : undefined
        }
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
  .input:focus{
    outline: none;
  }
</style>