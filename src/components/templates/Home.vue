<script setup>
import { ref, onMounted } from 'vue'
import CNavbar from "@/components/organisms/CNavbar.vue";
import CCalendar from "@/components/organisms/CCalendar.vue";
import CSidebarContainer from "@/components/organisms/CSidebarContainer.vue";
import dayjs from 'dayjs'
const currentMonthName = ref('')
const sidebarStatus = ref(true)
const monthDays = ref([])

/**
 * @name toggleSidebar
 * @description Togle the sidebar variable used in the CSidebarContainer component, if this variable is true, the page will show the sidebar.
 */
function toggleSidebar() {
    console.log('working???')
    sidebarStatus.value = !sidebarStatus.value
}
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
    <header>
        <c-navbar @toggle-theme="$emit('toggleTheme')" @toggle-sidebar="toggleSidebar" :currentMonth="currentMonthName" />
    </header>
    <c-sidebar-container :sidebar="sidebarStatus">
        <c-calendar :month="monthDays" />
    </c-sidebar-container>
</template>
