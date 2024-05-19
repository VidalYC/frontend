<script setup>
import { inject, computed, watch } from 'vue';
import { reset } from "@formkit/vue";
const toast = inject("toast");
import AuthAPI from "@/api/AuthAPI";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const user = useUserStore();
const router = useRouter();
const handleSubmit = async ({ ...formData }) => {
    try {
        const { data } = await AuthAPI.updateProfile(formData)
        toast.open({
            message: data.msg,
            type: "success",
        });
        router.push({ name: "admin-appointments" });
        reset("registerForm");
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: "error",
        });
    }
};

</script>
<template>
    <div class="mt-5 mx-2">
    </div>
    <div class="max-w-md mx-auto mt-5 bg-gray-700 p-8 rounded-lg shadow-lg">
        <FormKit id="registerForm" type="form" :actions="false"
            incomplete-message="No se puedo enviar, revisa las notificaciones" @submit="handleSubmit" :value="{
                email: user.getUserEmail
            }">

            <FormKit type="text" label="Nombre" name="name" placeholder="Nombre" validation="required|length:3"
                :value=user.getUserName :validation-messages="{
                    required: 'El nombre es obligatorio',
                    length: 'El nombre es muy corto',
                }" />

            <FormKit type="email" label="Email" name="email" placeholder="Email" validation="required|length:3|email"
                :validation-messages="{
                    required: 'El Email es Obligatorio',
                    length: 'El correo es muy Corto',
                    email: 'Email no valido',
                }" />
            <FormKit type="submit">Guardar </FormKit>
        </FormKit>
    </div>
</template>
