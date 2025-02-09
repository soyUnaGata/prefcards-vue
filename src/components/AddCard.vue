<script setup>
import { ref, nextTick } from 'vue'
import {BForm} from "bootstrap-vue-3";
import PrefCardsService from "../../service/prefcards-service";
import router from "@/router";
import ReturnButton from "@/components/shared/ReturnButton.vue";

const prefCard = ref({
  name: '',
  operation: '',
  duration: '',
  tools:''
})

const saveCard = async (event) => {
  event.preventDefault()
try {
  await PrefCardsService.addPrefCard(prefCard.value);
}catch(error) {
    console.log(error);
}
}

const cancelForm = async () => {
  await router.push({name: 'cards'});
}
</script>

<template>

    <return-button @click="cancelForm" />

  <div>
    <b-form @submit="saveCard">
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

      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="button" variant="danger" @click="cancelForm">Cancel</b-button>
    </b-form>
  </div>
</template>


<style scoped>

</style>