<script setup>
import { computed, ref, onMounted } from "vue"
import { useStore } from "vuex"
import dayjs from 'dayjs'
import Home from "@/components/templates/Home.vue";

const store = useStore();

const monthName = ref('')
const calendar = ref([])
const weekList = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
const monthsList = ref([ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ])

/**
 * @name populateCalendar
 * @description Get all the days filled with the blank start of the month for a given the month index.
 * @param {Number} monthIndex month value as a number to get the dates from
 * @return {Array} Return days filled with the blank start of a given month index as a array of objects.
 */
function populateCalendar(monthIndex) {
  const calendarTemp = daysInMonthList(monthIndex)
  const firstCalendarDay = dayjs(calendarTemp[0].date).day()
  let calendarFiller = []

  if (firstCalendarDay !== 0) {
    for (let i = 0; i < firstCalendarDay; i++) {
      calendarFiller.push({
        date: null,
        day: null,
        week: weekList.value[i]
      })
    }
  }

  return [...calendarFiller, ...calendarTemp]
}

/**
 * @name daysInMonthList
 * @description Get all the days a given the month index.
 * @param {Number} monthIndex month value as a number to get the dates from
 * @return {Array} Return days of a given month index as a array of objects.
 */
function daysInMonthList(monthIndex) {
  const currentYear = dayjs().year();
  let localCalendar = []
  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    localCalendar.push({
        date: dayjs(`${currentYear}-${monthIndex}-${i}`),
        day: dayjs(`${currentYear}-${monthIndex}-${i}`).date(),
        week: weekList.value[dayjs(`${currentYear}-${monthIndex}-${i}`).day()]
    })
  }
  return localCalendar
}

onMounted(() => {
    const monthIndex = dayjs().month() + 1;

    monthName.value = monthsList.value[monthIndex];
    calendar.value = populateCalendar(monthIndex)
})

</script>

<template>
  <main>
    <!-- @edit-reminder="payload => store.dispatch('editReminder', payload)"
    @clear-reminder="payload => store.dispatch('clearReminder', payload)"
    @clear-all-reminders="store.dispatch('clearAllReminders')" -->
    <Home
      @toggle-done-reminder="payload => store.dispatch('toggleDoneReminder', payload)"
      @add-reminder="payload => store.dispatch('addReminder', payload)"
      @edit-reminder="payload => store.dispatch('editReminder', payload)"
      @clear-reminder="payload => store.dispatch('deleteReminder', payload)"
      @clear-day-reminders="payload => store.dispatch('deleteDayReminders', payload)"
      @clear-all-reminders="store.dispatch('deleteAllReminders')"
      :monthName="monthName"
      :calendar="calendar"
    />
  </main>
</template>
