<template>
  <div class="input-element">
    <input class="input" v-bind:class="{ 'input-error' : error}"  :value="value" :name="name" :placeholder="placeholder" @input="onInput" :type="type" />
    <div v-if="error" class="error">{{error}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      error: {
        type: String,
        required: false,
        default: ''
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      placeholder: {
        type: String,
        required: false,
        default: 'Please fill in the field...'
      }
    },
    methods: {
      onInput(event) {
        this.$emit('input', {fieldName: this.name, value: event.target.value});
      }
    }
  }
</script>
<style>
  .input-element{
    margin: 10px 0;
  }
  .input{
    width:300px;
    margin-bottom:0;
    padding: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .input-error{
    border: 1px solid red;
    border-radius:3px;
  }
  .error{
    color: red;
    margin:0 10px;
  }
</style>