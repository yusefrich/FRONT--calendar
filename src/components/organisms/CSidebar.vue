<script setup>
import dayjs from 'dayjs'
import { computed } from "vue"
import { useStore } from "vuex"
import CReminder from "@/components/molecules/CReminder.vue";
import CReminderActions from "@/components/molecules/CReminderActions.vue";

const store = useStore();
const reminders = computed(() => store.getters.remindersByDate);
</script>

<template>
    <div class="sidebar-container transition">
        <div class="reminders-heading">
            <span>Today Reminders</span>
        </div>
        <div class="reminders-container">
            <c-reminder v-for="(reminder, i) in reminders(dayjs())" :key="'reminder_current_day_' + i" :options="reminder" />
        </div>
        <div class="actions">
            <c-reminder-actions @add="$emit('addReminder', { dateTime: dayjs() })" @clear="$emit('clearDayReminders', { dateTime: dayjs() })"></c-reminder-actions>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-container{
    padding: 10px;
    height: 100%;
    position: relative;
    .actions{
        position: absolute;
        display: none;
        margin-top: 20px;
        width: 100%;
        bottom: 0;
        background-image: linear-gradient(transparent, var(--color-background), var(--color-background), var(--color-background));
    }
    .reminders-container{
        overflow: auto;
        padding-bottom: 40px;
        max-height: calc(100vh - 132px);
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar{
            display: none;
        }
    }
    &:hover{
        .actions{
            display: block;
        }
    }
}
.reminders-heading{
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-background-soft);
}
</style>