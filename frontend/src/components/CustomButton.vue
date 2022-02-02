<template>
  <button class="custom-button" type="submit" :disabled="disabled" @click="onSubmit">{{buttonText}}</button>
</template>
<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      onSubmit: {
        type: Function,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      }
    }
  }
</script>
<style>
  .custom-button{
    cursor: pointer;
    background-color: #3498db;
    border: 0;
    padding: 8px;
    border-radius: 3px;
    color: #fff;
    margin: 10px;
  }
  .custom-button:disabled{
    opacity: 0.5;
    cursor: default;
  }
</style>