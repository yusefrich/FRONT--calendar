<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import CNavbar from "@/components/organisms/CNavbar.vue";
import CCalendar from "@/components/organisms/CCalendar.vue";
import CSidebar from "@/components/organisms/CSidebar.vue";
import CModal from "@/components/molecules/CModal.vue";
import CReminderForm from "@/components/molecules/CReminderForm.vue";
import CMain from "@/components/layouts/CMain.vue";
import dayjs from 'dayjs'

const currentMonthName = ref('')
const sidebarStatus = ref(true)
const modalStatus = ref(false)
const monthDays = ref([])

const store = useStore();

onMounted(() => {
    let currentMonth = dayjs().month() + 1
    let currentYear = dayjs().year()
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    currentMonthName.value = months[currentMonth]
    for (let i = 1; i <= dayjs().daysInMonth(); i++) {
        monthDays.value.push({
            date: dayjs(`${currentYear}-${currentMonth}-${i}`),
            day: dayjs(`${currentYear}-${currentMonth}-${i}`).date(),
            week: daysOfWeek[dayjs(`${currentYear}-${currentMonth}-${i}`).day()]
        })
    }
    let firstDay = dayjs(monthDays.value[0].date).day()
    let startOfMonth = []
    if (firstDay !== 0) {
        for (let i = 0; i < firstDay; i++) {
            startOfMonth.push({
                date: null,
                day: null,
                week: daysOfWeek[i]
            })
        }
    }
    startOfMonth.reverse()
    startOfMonth.forEach(e => {
        monthDays.value.unshift(e)
    });
})
</script>

<template>
    <c-main :sidebar="sidebarStatus">
        <template v-slot:header>
            <c-navbar @toggle-theme="$emit('toggleTheme')" @toggle-sidebar="sidebarStatus = !sidebarStatus" :currentMonth="currentMonthName" />
        </template>
        <template v-slot:sidebar>
            <c-sidebar @add-reminder="modalStatus = true" />
        </template>
        <c-calendar :month="monthDays" />
    </c-main>
    <c-modal v-if="modalStatus" @close="modalStatus = false">
        <c-reminder-form @submit-data="payload => store.dispatch('addReminder', payload)"></c-reminder-form><!-- store.dispatch('addReminder', payload) -->
    </c-modal>
</template>
