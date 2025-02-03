<script setup>
import { ref, nextTick } from 'vue'
import {BForm} from "bootstrap-vue-3";

const form = ref({
  name: '',
  operation: '',
  duration: '',
  tools:''
})

const show = ref(true)

const onSubmit = (event) => {
  event.preventDefault()
  alert(JSON.stringify(form.value))
}

const onReset = async (event) => {
  event.preventDefault()
  form.value.name = ''
  form.value.operation = ''
  form.value.duration = ''
  form.value.tools = ''
  show.value = false
  await nextTick()
  show.value = true
}
</script>


<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your name with anyone else."
      >
        <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter name"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Operation:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.operation"
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Duration:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.duration"
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tools:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.tools"
            placeholder="Enter operation"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>


<style scoped>

</style>