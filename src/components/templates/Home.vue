<script setup>
import { ref, onMounted, inject } from 'vue'
import CNavbar from "@/components/organisms/CNavbar.vue";
import CCalendar from "@/components/organisms/CCalendar.vue";
import CSidebar from "@/components/organisms/CSidebar.vue";
import CModal from "@/components/molecules/CModal.vue";
import CReminderForm from "@/components/molecules/CReminderForm.vue";
import CReminderView from "@/components/molecules/CReminderView.vue";
import CMain from "@/components/layouts/CMain.vue";

const submiting = ref(true)
const sidebarStatus = ref(true)
const modalStatus = ref(false)
const reminder = ref({})
const emit = defineEmits(['addReminder', 'editReminder', 'clearReminder', 'clearDayReminders', 'clearAllReminders', 'toggleDoneReminder'])
const emitter = inject('emitter');   // Inject `emitter`

defineProps({
    monthName: {
        type: String,
    },
    calendar: {
        type: Array,
    },
});

onMounted(() => {
    emitter.on("open-reminder", (payload) => {
        modalStatus.value = true
        submiting.value = false
        reminder.value = payload
    });
    emitter.on("edit-reminder", (payload) => {
        modalStatus.value = true
        reminder.value = payload
    });
    emitter.on("clear-reminder", (payload) => {
        modalStatus.value = false
        emit('clearReminder', payload)
    });
    emitter.on("toggle-done-reminder", (payload) => {
        emit('toggleDoneReminder', payload)
    });
})
</script>

<template>
    <c-main :sidebar="sidebarStatus">
        <template v-slot:header>
            <c-navbar @toggle-sidebar="sidebarStatus = !sidebarStatus" @clear-all-reminders="$emit('clearAllReminders')" :currentMonth="monthName" />
        </template>
        <template v-slot:sidebar>
            <c-sidebar @add-reminder="payload => {modalStatus = true; reminder = payload; submiting = true}" @clear-day-reminders="payload => $emit('clearDayReminders', payload)" />
        </template>
        <c-calendar @add-reminder="payload => {modalStatus = true; reminder = payload; submiting = true}" @clear-day-reminders="payload => $emit('clearDayReminders', payload)" :month="calendar" />
    </c-main>
    <c-modal v-if="modalStatus" @close="modalStatus = false" :title="reminder.title ? reminder.title : 'Reminder form'" :done="reminder.done">
        <c-reminder-form
            v-if="submiting"
            @submit-data="payload => {payload.id ? $emit('editReminder', payload) : $emit('addReminder', payload); modalStatus = false}"
            :reminder="reminder"
        />
        <c-reminder-view v-else @edit="submiting = true" :reminder="reminder" />
    </c-modal>
</template>
