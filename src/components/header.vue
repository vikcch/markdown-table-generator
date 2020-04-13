<template>
  <header class="hello">
    <h1>{{ msg }}</h1>
    
  </header>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
