<template>
  <div class="hello">
    <h1>Hola</h1>
    <b-card bg-variant="dark" text-variant="white" title="Card Title">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
import {BCard} from "bootstrap-vue-3";

export default {
  name: 'HelloWorld',
  components: {BCard},
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
