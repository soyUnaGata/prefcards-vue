<template>
  <div id="container">
   <RouterView/>
  </div>
</template>

<script>
import HelloWorld from './components/HomeView.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#container {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
