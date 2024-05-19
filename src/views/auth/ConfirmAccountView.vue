<script setup>
import { onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthAPI from '../../api/AuthAPI'

const toast = inject('toast')
const route = useRoute();
const router = useRouter();
const { token } = route.params;
onMounted(async () => {
    try {
        const { data } = await AuthAPI.verifyAccount(token)
        toast.open({
            message: data.msg,
            type: 'success'
        })
        setTimeout(() => {
            router.push({ name: 'login' })
        }, 5000);
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
})
</script>

<template>
    <div class="bg-indigo-700 rounded p-2">
        <h1>Cuenta Confirmada Correctamente</h1>
    </div>
</template>
