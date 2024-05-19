<script setup>
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>
<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-2xl lg:text-6xl font-black text-white">
        Salón de Belleza Esencia Refined
      </h1>
      <h2 class="text-xl lg:text-2xl font-black text-white">
        Panel de Administración
      </h2>
    </div>
    <div class="flex flex-col space-y-5 mt-4">
      <div class="flex gap-8 items-center">
        <p class="text-white text-right"> Hola: {{ user.getUserName }}</p>
        <button type="button" class="bg-red-600 hover:bg-red-700 px-6  text-white text-sm font-extrabold rounded-lg"
          @click="user.logout">
          Cerrar Sesión
        </button>
      </div>
      <div class="flex flex-row gap-3">
        <RouterLink :to="{ name: 'admin-appointments' }"
          class="bg-blue-600 hover:bg-blue-700 py-4 w-full text-white text-sm font-bold rounded-lg text-center">
          Pendientes
        </RouterLink>
        <RouterLink :to="{ name: 'admin-appointments-completed' }"
          class="bg-blue-600 hover:bg-blue-700 py-4 w-full text-white text-sm font-bold rounded-lg text-center">
          Completadas
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="mt-3 flex justify-between">
    <RouterLink :to="{ name: 'services-salon' }"
      class="p-3 text-gray-200  px-24  uppercase text-xs font-black rounded-lg bg-blue-700 ">
      Servicios
    </RouterLink>
    <RouterLink :to="{ name: 'perfil' }" class="p-3 text-gray-200 px-3  uppercase text-sm font-black rounded-lg">
      Perfil
    </RouterLink>
  </div>
  <main class="space-y-6">
    <RouterView />
  </main>
</template>
