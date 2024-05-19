<script setup>
import ServicesAPI from '@/api/ServicesAPI';
import { inject } from 'vue';
import { reset } from "@formkit/vue";
const toast = inject("toast");


const handleSubmit = async ({ ...formData }) => {
    try {
        const { data } = await ServicesAPI.create(formData);
        toast.open({
            message: data.msg,
            type: "success",
        });
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
        <RouterLink :to="{ name: 'list-services' }" class="text-white font-bold">
            Ver Listado de Servicios
        </RouterLink>
    </div>
    <div class="max-w-md mx-auto mt-5 bg-gray-700 p-8 rounded-lg shadow-lg">
        <FormKit id="registerForm" type="form" :actions="false"
            incomplete-message="No se puedo enviar, revisa las notificaciones" @submit="handleSubmit">

            <FormKit type="text" label="Nombre" name="name" placeholder="Nombre Servicio" validation="required|length:3"
                :validation-messages="{
                    required: 'El nombre del servicio es obligatorio',
                    length: 'El nombre es muy corto',
                }" />

            <FormKit type="number" label="Precio" name="price" placeholder="Precio Servicio" validation="required"
                :validation-messages="{
                    required: 'El Precio es Obligatorio',

                }" />
            <FormKit type="submit">Crear Servicio</FormKit>
        </FormKit>
    </div>
</template>
