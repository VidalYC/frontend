  
<script setup>
import { useModalStore } from '@/stores/modal';
import { reactive, computed } from 'vue';
const modal = useModalStore()
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

import { useAppointmentsStore } from '@/stores/appointments'
const appointment = useAppointmentsStore()



</script>
  

<template>
    <TransitionRoot as="template" :show="modal.modal">
        <Dialog as="div" class="relative z-10" @close="modal.handleClikModal()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                                <div class="mx-auto max-w-lg text-center">
                                    <h1 class="text-2xl font-bold sm:text-3xl">Envia un Mensaje</h1>
                                </div>

                                <form class="mx-auto mb-0 mt-8 max-w-md space-y-4">
                                    <div>
                                        <label for="email" class="sr-only">Asunto</label>
                                        <div class="relative">
                                            <input type="text"
                                                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Asunto" v-model="modal.mensajes.asunto" />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="password" class="sr-only">Mensaje</label>
                                        <div class="relative">
                                            <textarea class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                                placeholder="Mensaje" v-model="modal.mensajes.mensaje"></textarea>
                                        </div>
                                    </div>
                                    <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                                        <button type="button"
                                            class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                                            @click="modal.handleClikModal()">Cerrar</button>
                                        <button type="button"
                                            class="w-full rounded bg-indigo-600 p-3 font-bold uppercase text-white shadow hover:bg-indigo-500"
                                            @click="appointment.enviaMensaje()">Enviar</button>
                                    </div>
                                </form>
                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
