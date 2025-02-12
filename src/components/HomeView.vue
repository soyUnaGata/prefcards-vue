<template>
  <div class="prefcard-container">
    <Loading :loading="isLoading" />
    <ErrorNotification :error="errorMessageApi" />
    <div class="header" v-show="!isLoading">
      <h2>PrefCards List</h2>
      <b-button variant="success" class="card-add-btn" @click="addCard">Add</b-button>
    </div>
  <div class="wrapper">
    <b-card class="card-wrapper" text-variant="white" v-for="prefcard in prefcards" :key="prefcard.id" :id="prefcard.id">
      <div class="card-remove" @click="removeCard(prefcard.id)">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </div>
      <div class="card-inner">
        <h4>{{prefcard.name}}</h4>
        <b-card-text>
         Duration: {{prefcard.duration }} minutes
        </b-card-text>
        <b-card-text>
         Operation type: {{prefcard.operation }}
        </b-card-text>
        <b-card-text>
         Tools: {{prefcard.tools }}
        </b-card-text>
        <b-button @click="editCard(prefcard.id)" class="edit-btn">Edit</b-button>
      </div>
    </b-card>
  </div>
  </div>
</template>

<script setup>
import {BCard} from "bootstrap-vue-3";
import {onMounted, ref} from "vue";
import PrefCardsService from "../../service/prefcards-service";
import router from "@/router";
import Loading from "@/components/shared/Loading.vue";
import ErrorNotification from "@/components/shared/ErrorNotification.vue";

const prefcards = ref();
const isLoading = ref(true);
const errorMessageApi = ref({});

//get => load, loading screen, lodash debonce 300
const loadPrefCards = async () => {
  try {
     prefcards.value = await PrefCardsService.getAllPrefCards();
  }catch(error) {
    errorMessageApi.value = error.message || 'Error happened';
  }finally {
    isLoading.value = false;
  }
}

const editCard = async (id) => {
  await router.push({name: 'card-edit', params: { id }});
}

const removeCard = async (id) => {
  await PrefCardsService.removePrefCard(id);
  prefcards.value = await PrefCardsService.getAllPrefCards();
}

const addCard = async () => {
  await router.push({name: 'card-add'});
}

onMounted(async () => {
  await loadPrefCards();
  isLoading.value;
})

</script>

<style scoped>
.wrapper {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
}

.card-wrapper {
  background: rgba( 243, 239, 246, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  width: 350px;
}

.card-inner{
  color: #33324B;
}

.edit-btn {
  border-color: #3f4fd7;
  background-color: #3f4fd7;
}

.edit-btn:hover, .edit-btn:focus, button.edit-btn:active {
  background-color: #2330a9;
  border-color: #2330a9;
}

.card-remove {
  fill: #dd515b;
  display: flex;
  justify-content: end;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.card-add-btn{
  margin-right: 33px;
}
@media (max-width: 1200px) {
  .wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .card-add-btn{
    margin-right: 28px;

  }
}

@media (max-width: 1006px) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 992px) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
  .card-add-btn{
    margin-right: 0;

  }
}

@media (max-width: 768px){
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }

  .card-add-btn{
    margin-right: 0;

  }
}

@media (max-width: 480px) {
  .wrapper {
    grid-template-columns: 1fr;
  }

  .card-add-btn{
    margin-right: 0;

  }
}
</style>
