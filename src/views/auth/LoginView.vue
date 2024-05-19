<script setup>
import AuthAPI from "../../api/AuthAPI";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();

const toast = inject("toast");
const router = useRouter();

const authRoutes = [{ name: "home", text: "Volver A inicio" }];

const handleSubmit = async (formData) => {
    try {
        const {
            data: { token },
        } = await AuthAPI.login(formData);
        localStorage.setItem("AUTH_TOKEN", token);
        router.push({ name: "my-appointments" });
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: "error",
        });
    }
};
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-5">
        Iniciar Sesión
    </h1>
    <p class="text-2xl text-white text-center my-2">
        Si tienes una cuenta Inicia Sesión
    </p>
    <FormKit id="loginForm" type="form" :actions="false"
        incomplete-message="No se puedo enviar, revisa las notificaciones" @submit="handleSubmit">
        <FormKit type="email" label="Email" name="email" placeholder="Email de Usuario" validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no valido',
            }" />
        <FormKit type="password" label="Password" name="password" placeholder="Password de Usuario"
            validation="required" :validation-messages="{
                required: 'El Password es obligatorio',
            }" />
        <FormKit type="submit">Iniciar Sesión</FormKit>
    </FormKit>
    <nav class="flex flex-col items-center space-y-5 lg:flex-row mt-2 lg:justify-evenly lg:space-y-0">
        <RouterLink v-for="authRoute in authRoutes"
            class="uppercase font-bold text-white    px-4 bottom-0 py-2 rounded-md " :to="{ name: authRoute.name }"
            :class="{ hidden: route.name === authRoute.name }">{{ authRoute.text }}
        </RouterLink>
    </nav>
</template>
