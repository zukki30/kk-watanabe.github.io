<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App tset'
    }
  }
}
</script>

<style lang="scss">
  .hello {
  	background-color: #ccc;
    h1 {
      color: red;
      font-size: 6.0rem
    }
  }
</style>
