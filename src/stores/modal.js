import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useModalStore = defineStore("modal", () => {
  const modal = ref(false);
  const mensajes = reactive({
    asunto: "",
    mensaje: "",
  });

  function handleClikModal() {
    modal.value = !modal.value;
  }
  return {
    modal,
    handleClikModal,
    mensajes,
  };
});
