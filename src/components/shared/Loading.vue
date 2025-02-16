<template>
  <div class="loader" v-if="loading">
    <h3>We use free resources, so loading all the information may take some time.</h3>
    <h3>Thank you for your patience!</h3>
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
