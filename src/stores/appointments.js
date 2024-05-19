import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AppointmentAPI from "../api/AppointmentAPI";
import { convertToISO, convertoDDMMYYYY } from "../helpers/date";
import { useModalStore } from "./modal";
import { useUserStore } from "./user";
export const useAppointmentsStore = defineStore("appointments", () => {
  const appointementId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointementsByDate = ref([]);
  const userOne = ref("");
  const citaOne = ref("");

  const toast = inject("toast");
  const router = useRouter();
  const user = useUserStore();
  const modal = useModalStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    time.value = "";
    if (date.value === "") return;
    // Obtenemos las citas
    const { data } = await AppointmentAPI.getByDate(date.value);

    if (appointementId.value) {
      appointementsByDate.value = data.filter(
        (appointment) => appointment._id !== appointementId.value
      );
      time.value = data.filter(
        (appointment) => appointment._id === appointementId.value
      )[0].time;
    } else {
      appointementsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointement) {
    services.value = appointement.services;
    date.value = convertoDDMMYYYY(appointement.date);
    time.value = appointement.time;
    appointementId.value = appointement._id;
  }

  function onServiceSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        alert("Maximo 2 servicios por cita");
        return;
      }
      services.value.push(service);
    }
  }

  async function saveAppointment() {
    const appointement = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (appointementId.value) {
      try {
        const { data } = await AppointmentAPI.update(
          appointementId.value,
          appointement
        );
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await AppointmentAPI.create(appointement);
        toast.open({
          message: data.msg,
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }
    clearAppointmentData();
    user.getUserAppointments();
    router.push({ name: "my-appointments" });
  }

  function clearAppointmentData() {
    appointementId.value = "";
    services.value = [];
    date.value = "";
    time.value = "";
  }

  async function cancelAppointment(id) {
    if (confirm("¿Deseas Cancelar esta cita?")) {
      try {
        const { data } = await AppointmentAPI.delete(id);
        toast.open({
          message: data.msg,
          type: "success",
        });
        user.userAppointments = user.userAppointments.filter(
          (appointement) => appointement._id !== id
        );
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
  }

  async function completedAppointment(id) {
    if (confirm("¿Completar Cita?")) {
      try {
        const { data } = await AppointmentAPI.completed(id);
        toast.open({
          message: data.msg,
          type: "success",
        });
        user.userAppointments = user.userAppointments.filter(
          (appointement) => appointement._id !== id
        );
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
  }

  async function sendMessage(id, idCita) {
    userOne.value = id;
    citaOne.value = idCita;
    modal.handleClikModal();
  }

  async function enviaMensaje() {
    const identy = userOne.value;
    const identityCita = citaOne.value;
    if (Object.values(modal.mensajes).includes("")) {
      toast.open({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      return;
    }
    const mensaje = {
      asunto: modal.mensajes.asunto,
      message: modal.mensajes.mensaje,
    };
    try {
      const { data } = await AppointmentAPI.sendMessage(identy, mensaje);
      await AppointmentAPI.delete(identityCita);
      user.userAppointments = user.userAppointments.filter(
        (appointement) => appointement._id !== identityCita
      );
      modal.modal = false;
      modal.mensajes = {};
      userOne.value = "";
      citaOne.value = "";
      toast.open({
        message: data.msg,
        type: "success",
      });
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: "error",
      });
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(() => services.value.length === 0);

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length;
  });

  const isDateSelected = computed(() => {
    return date.value ? true : false;
  });

  const disableTime = computed(() => {
    return (hour) => {
      return appointementsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    saveAppointment,
    clearAppointmentData,
    cancelAppointment,
    completedAppointment,
    isServiceSelected,
    totalAmount,
    noServicesSelected,
    isValidReservation,
    isDateSelected,
    disableTime,
    enviaMensaje,
    sendMessage,
  };
});
