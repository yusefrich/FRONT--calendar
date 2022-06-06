<script setup>
import CDay from "@/components/molecules/CDay.vue";
defineProps({
    month: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="calendar-container">
        <div class="week-heading"></div>
        <div class="days-container">
            <c-day
                @clear-day-reminders="payload => $emit('clearDayReminders', payload)"
                @add-reminder="payload => $emit('addReminder', payload)"
                v-for="(day, i) in month"
                :key="'day_key_'+i"
                :day="day.day"
                :week="i <= 6 ? day.week : null"
                :date="day.date"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.days-container{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    height: calc(100vh - 56px);
    overflow: hidden;
}
</style>