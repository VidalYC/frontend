<script setup>
import { displayDate } from "../helpers/date";
import { formatCurrency } from "../helpers";
import { useAppointmentsStore } from "../stores/appointments";

const appointments = useAppointmentsStore();
defineProps({
  appointment: {
    type: Object,
  },
});
</script>
<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-black-500 font-black">
      fecha:
      <span class="font-light">{{ displayDate(appointment.date) }}</span> Hora:
      <span class="font-light">{{ appointment.time }}</span>
    </p>
    <p class="text-black-500 font-black">
      Nombre Cliente:
      <span class="font-light">{{ appointment.user.name }}</span> Email:
      <span class="font-light">{{ appointment.user.email }}</span>
    </p>
    <p class="text-lg font-black">Servicios solicitados en la cita</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>
    <hr class="my-4 border-t border-gray-300">
    <p class="text-2xl font-black text-right">
      Total a Pagar:
      <span class="text-blue-600">{{
        formatCurrency(appointment.totalAmount)
      }}</span>
    </p>
    <div class="space-x-3">
      <!-- <button class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointments.cancelAppointment(appointment._id)">
        Cancelar Cita
      </button> -->

      <button v-if="appointment.completed === false"
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointments.sendMessage(appointment.user._id, appointment._id)">
        Cancelar Cita
      </button>
      <button v-if="appointment.completed === false"
        class=" bg-cyan-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointments.completedAppointment(appointment._id)">
        Completar Cita
      </button>
    </div>
  </div>
</template>
