<script setup>
import { ref, nextTick } from 'vue'
import {BForm} from "bootstrap-vue-3";
import PrefCardsService from "../../service/prefcards-service";

const prefCard = ref({
  name: '',
  operation: '',
  duration: '',
  tools:''
})

const show = ref(true)

const saveCard = async (event) => {
  event.preventDefault()
  alert(JSON.stringify(prefCard.value))
await PrefCardsService.addPrefCard(prefCard.value);

}

const onReset = async (event) => {
  event.preventDefault()
  prefCard.value.name = ''
  prefCard.value.operation = ''
  prefCard.value.duration = ''
  prefCard.value.tools = ''
  show.value = false
  await nextTick()
  show.value = true
}
</script>

<template>
  <div>
    <b-form @submit="saveCard" @reset="onReset" v-if="show">
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
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tools:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="prefCard.tools"
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ prefCard }}</pre>
    </b-card>
  </div>
</template>


<style scoped>

</style>