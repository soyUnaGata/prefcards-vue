<script setup>
import {ref, computed, watch, onUnmounted} from 'vue';
import PrefCardsService from "../../service/prefcards-service";
import router from "@/router";
import {BFormInput} from "bootstrap-vue-3";
import ReturnButtonIcon from "@/components/icons/ReturnButtonIcon.vue";
import Loading from "@/components/shared/Loading.vue";
import ErrorNotification from "@/components/shared/ErrorNotification.vue";

const prefCard = ref({
  name: '',
  operation: '',
  duration: '',
  tools: ''
});
const errorMessage = ref('');
const isLoading = ref(false);
const isValid = ref(false);
const errorMessageApi = ref({});

const normalizeDuration = computed({
  get: () => prefCard.value.duration,
  set: (value) => {
    const onlyDigits = value.replace(/\D/g, '');
    prefCard.value.duration = onlyDigits;
    console.log(isFormValid.value);
    console.log(!isFormValid.value);
    if (!onlyDigits || value.trim() !== onlyDigits) {
      isValid.value = true;
      errorMessage.value = 'Enter a valid number';
    } else {
      errorMessage.value = '';
      isValid.value = false;
    }
  }
});

const inputState = computed(() => {
  return errorMessage.value ? false : null;
});

const isFormValid = computed(() =>
    prefCard.value.name.trim() !== '' &&
    prefCard.value.operation.trim() !== '' &&
    prefCard.value.duration !== '' &&
    prefCard.value.tools.trim() !== '' &&
    !isValid.value
);

const saveCard = async (event) => {
  event.preventDefault();
  if (!isFormValid.value) return;
  try {
    isLoading.value = true;
    isFormValid.value = false;
    await PrefCardsService.addPrefCard(prefCard.value);
    window.location.href = '/';
  } catch (error) {
    errorMessageApi.value = error.message || 'Error happened';
  }
};

const cancelForm = async () => {
  await router.push({ name: 'cards' });
};

onUnmounted(async () => {
  isLoading.value = false;
})
</script>

<template>
  <Loading :loading="isLoading" />
  <ErrorNotification :error="errorMessageApi" />
  <div class="prefcard-container">
  <return-button-icon @click="cancelForm" />
    <div class="prefcard-content">
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
            v-model="normalizeDuration"
            placeholder="Enter duration in minutes"
            :state="inputState"
            required
            aria-describedby="input-live-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback" >
          {{ errorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4" label="Tools:" label-for="input-4">
        <b-form-input id="input-4" v-model="prefCard.tools" placeholder="Enter tools" required></b-form-input>
      </b-form-group>

     <div class="form-btns">
       <b-button type="submit" variant="success" :disabled="!isFormValid">Save</b-button>
       <b-button type="button" variant="danger" @click="cancelForm">Cancel</b-button>
     </div>
    </b-form>
  </div>
  </div>
</template>

<style>

</style>

