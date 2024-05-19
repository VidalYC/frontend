<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const authRoutes = [
  { name: "register", text: "Crear una Cuenta" },
  { name: "login", text: "Iniciar Sesión" },
];
</script>

<template>
  <main>
    <h1 class="text-6xl font-black text-white pt-16 text-center">
      Salón de Belleza Esencia Refined
    </h1>

    <div class="mx-auto lg:w-3/5 mt-11 ">
      <RouterView />

      <h3 class="text-3xl font-bold mt-10 text-teal-500 text-center">
        ¡Bienvenidos al Salón de Belleza Esencia Refined !
      </h3>
      <p class="mt-3 text-xl font-bold font-sans text-white">
        Descubre la excelencia en belleza y bienestar. En nuestro salón, fusionamos estilo y relajación para realzar tu
        belleza única. Desde cortes de vanguardia hasta tratamientos rejuvenecedores, te ofrecemos una experiencia única
        que refleja tu estilo. ¡Déjanos cuidarte y resaltar tu mejor versión!
      </p>
      <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-evenly lg:space-y-0 pb-28">
        <RouterLink v-for="authRoute in authRoutes"
          class="uppercase px-4 py-2 text-blue-600 font-extrabold hover:underline" :to="{ name: authRoute.name }"
          :class="{ hidden: route.name === authRoute.name }">{{ authRoute.text }}
        </RouterLink>
      </nav>
    </div>
  </main>
</template>
