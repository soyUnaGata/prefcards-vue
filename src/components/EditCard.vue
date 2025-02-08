<script setup>
import {BForm} from "bootstrap-vue-3";
import {useRoute} from "vue-router";
import PrefCardsService from "../../service/prefcards-service";
import {onMounted, ref} from "vue";

const route = useRoute();
const prefCardId = ref(route.params.id);
const prefCard  = ref({});

const getPrefCard = async () => {
  try{
    prefCard.value = await PrefCardsService.getPrefCard(prefCardId.value);
  }catch (error){
    console.log(error);
  }
}

const updatePrefCard = async (event) => {
  try{
    await PrefCardsService.updatePrefCard(prefCardId.value, prefCard.value);
  }catch(error){
    console.log(error);
  }
}


onMounted(async () => {
  await getPrefCard();
})
</script>

<template>
  <RouterLink :to="{name: 'cards'}">
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="green">
    <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22v72h288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H192v72c0 9.6-5.7 18.2-14.5 22z"/>
  </svg>
</RouterLink>

  <div>
    <b-form @submit="updatePrefCard">
      <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="prefCard.name"
            placeholder="Enter name"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Operation:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="prefCard.operation"
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Duration:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="prefCard.duration"
            placeholder="Enter duration"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tools:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="prefCard.tools"
            placeholder="Enter tools"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>


<style scoped>

</style>