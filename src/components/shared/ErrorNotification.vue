<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    error: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props) {
    const isVisible = ref(!!props.error);

    watch(() => props.error, (newError) => {
      if (newError) {
        isVisible.value = true;
      }
    });

    const closeNotification = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      closeNotification
    };
  },
  template: `
    <div v-if="isVisible" class="error-notification">
      <span>{{ error }}</span>
      <button @click="closeNotification">&times;</button>
    </div>
  `,
  style: `
    .error-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4d4d;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    .error-notification button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
    }

    @media (max-width: 768px) {
      .error-notification {
        top: 10px;
        right: 10px;
        padding: 8px 15px;
        font-size: 14px;
      }
      .error-notification button {
        font-size: 14px;
      }
    }
    @media (max-width: 480px) {
      .error-notification {
        top: 5px;
        right: 5px;
        padding: 6px 10px;
        font-size: 12px;
      }
      .error-notification button {
        font-size: 12px;
      }
    }
  `
});
</script>