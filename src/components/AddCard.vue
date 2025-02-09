<script setup>
import { ref, computed } from 'vue';
import PrefCardsService from "../../service/prefcards-service";
import router from "@/router";
import ReturnButton from "@/components/shared/ReturnButton.vue";
import {BFormInput} from "bootstrap-vue-3";

const prefCard = ref({
  name: '',
  operation: '',
  duration: '',
  tools: ''
});

const errorMessage = ref('');

const formattedDuration = computed({
  get: () => prefCard.value.duration,
  set: (value) => {
    const onlyDigits = value.replace(/\D/g, '');
    prefCard.value.duration = onlyDigits;

    if (value.trim() !== onlyDigits) {
      errorMessage.value = 'Enter a valid number';
    } else {
      errorMessage.value = '';
    }
  }
});

const isInvalid = computed(() => errorMessage.value !== '');

const inputState = computed(() => {
  if (!prefCard.value.duration) return null;
  return errorMessage.value ? false : null;
});

const isFormValid = computed(() =>
    prefCard.value.name.trim() !== '' &&
    prefCard.value.operation.trim() !== '' &&
    prefCard.value.duration !== '' &&
    prefCard.value.tools.trim() !== '' &&
    !isInvalid.value
);

const saveCard = async (event) => {
  event.preventDefault();
  if (!isFormValid.value) return;

  try {
    await PrefCardsService.addPrefCard(prefCard.value);
  } catch (error) {
    console.log(error);
  }
};

const cancelForm = async () => {
  await router.push({ name: 'cards' });
};
</script>

<template>
  <return-button @click="cancelForm" />

  <div>
    <b-form @submit="saveCard">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input id="input-1" v-model="prefCard.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Operation:" label-for="input-2">
        <b-form-input id="input-2" v-model="prefCard.operation" placeholder="Enter operation" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Duration:" label-for="input-3">
        <b-form-input
            id="input-3"
            v-model="formattedDuration"
            placeholder="Enter duration in minutes"
            :state="inputState"
            required
            aria-describedby="input-live-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">
          {{ errorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4" label="Tools:" label-for="input-4">
        <b-form-input id="input-4" v-model="prefCard.tools" placeholder="Enter tools" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" :disabled="!isFormValid">Save</b-button>
      <b-button type="button" variant="danger" @click="cancelForm">Cancel</b-button>
    </b-form>
  </div>
</template>
