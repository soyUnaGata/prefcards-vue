<script setup>
import { BForm, BFormInput, BButton, BFormGroup, BFormInvalidFeedback } from "bootstrap-vue-3";
import { useRoute } from "vue-router";
import PrefCardsService from "../../service/prefcards-service";
import { computed, onMounted, ref } from "vue";
import router from "@/router";
import ReturnButtonIcon from "@/components/icons/ReturnButtonIcon.vue";

const route = useRoute();
const prefCardId = ref(route.params.id);
const prefCard = ref({});
const errorMessage = ref('');

////get => load, loading screen, lodash debonce 300
const getPrefCard = async () => {
  try {
    prefCard.value = await PrefCardsService.getPrefCard(prefCardId.value);
  } catch (error) {
    console.log(error);
  }
}

//normalized ?
const formattedDuration = computed({
  get: () => prefCard.value.duration,
  set: (value) => {
    const onlyDigits = value.replace(/\D/g, '');
    prefCard.value.duration = onlyDigits;

    if (value.trim() !== onlyDigits || onlyDigits === '') {
      errorMessage.value = 'Please enter a valid number';
    } else {
      errorMessage.value = '';
    }
  }
});

//?
const isInvalid = computed(() => errorMessage.value !== '');

const inputState = computed(() => {
  if (!prefCard.value.duration) return null;
  return errorMessage.value ? false : null;
});

const isFormValid = computed(() =>
    (prefCard.value.name && prefCard.value.name.trim() !== '') &&
    (prefCard.value.operation && prefCard.value.operation.trim() !== '') &&
    (prefCard.value.duration && prefCard.value.duration.trim() !== '') &&
    (prefCard.value.tools && prefCard.value.tools.trim() !== '') &&
    !isInvalid.value
);

const updatePrefCard = async (event) => {
  event.preventDefault();
  try {
    await PrefCardsService.updatePrefCard(prefCardId.value, prefCard.value);
    window.location.href = '/';
  } catch (error) {
    errorMessage.value = error.message;
  }
}

const cancelForm = async () => {
  await router.push({name: 'cards'});
}

onMounted(async () => {
  await getPrefCard();
})
</script>

<template>
  <div class="container">
  <return-button-icon @click="cancelForm"/>
    <div class="prefcard-content">
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

        <b-form-group id="input-group-2" label="Tools:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="prefCard.tools"
              placeholder="Enter tools"
              required
          ></b-form-input>
        </b-form-group>

        <div class="form-btns">
          <b-button type="submit" variant="success" :disabled="!isFormValid">Save</b-button>
          <b-button type="button" variant="danger" @click="cancelForm">Cancel</b-button>
        </div>
    </b-form>
  </div>
  </div>
</template>

