import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from "../api/AuthAPI";
import AppointmentAPI from "../api/AppointmentAPI";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);
  const userAppointmentsCompleted = ref([]);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data.user;
      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });
  onMounted(async () => {
    try {
      const { data } = await AuthAPI.auth();
      user.value = data.user;
      await getUsersAppointmentsCompleted();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  async function getUserAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  async function getUsersAppointmentsCompleted() {
    const { data } = await AppointmentAPI.getUsersAppointmentsCompleted(
      user.value._id
    );
    userAppointmentsCompleted.value = data;
  }

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );
  const getUserEmail = computed(() =>
    user.value?.email ? user.value?.email : ""
  );

  const noAppointments = computed(() => userAppointments.value.length === 0);
  return {
    user,
    userAppointments,
    loading,
    getUserName,
    getUserEmail,
    logout,
    getUserName,
    noAppointments,
    getUserAppointments,
    userAppointmentsCompleted,
  };
});
