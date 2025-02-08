<template>
  <div class="hello">
    <RouterLink :to="{name: 'card-add'}">Add</RouterLink>

    <h1>Hola</h1>
    <b-card bg-variant="dark" text-variant="white" v-for="prefcard in prefcards" :key="prefcard.id">
      <RouterLink to="">
        Delete
      </RouterLink>
     <div>
       <h4>{{prefcard.name}}</h4>
       <b-card-text>
         {{prefcard.duration }}
       </b-card-text>
       <b-button @click="editCard(prefcard.id)" variant="primary">Edit</b-button>
     </div>
    </b-card>
  </div>
</template>

<script setup>
import {BCard} from "bootstrap-vue-3";
import {onMounted, ref} from "vue";
import PrefCardsService from "../../service/prefcards-service";
import router from "@/router";

const prefcards = ref();

const getPrefCards = async () => {
  try {
     prefcards.value = await PrefCardsService.getAllPrefCards();
    console.log(prefcards.value);
  }catch(error) {
    console.log(error);
  }
}

const editCard = async (id) => {
  await router.push({name: 'card-edit', params: { id: id }});
}

onMounted(async () => {
  await getPrefCards();
})

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
