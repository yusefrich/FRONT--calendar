<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import CReminderActions from "@/components/molecules/CReminderActions.vue";
import CReminder from "@/components/molecules/CReminder.vue";
import dayjs from 'dayjs'

defineProps({
    date: {
        type: Object,
    },
    day: {
        type: Number,
    },
    week: {
        type: String,
    },
});

const store = useStore();
const reminders = computed(() => store.getters.remindersByDate);
</script>
<template>
    <div class="calendar-day-container transition" :class="{disabled: !date}">
        <div class="calendar-day-block" :class="{'smaller-reminders': week}">
            <span v-if="week" class="day-of-week">{{ week }}</span>
            <span class="day-of-month">
                <span :class="{'today-active': dayjs().format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY')}">
                    {{ day }}
                </span>
            </span>
            <div v-if="day" class="reminders">
                <c-reminder v-for="(reminder, i) in reminders(dayjs(date))" :key="'reminder_' + day + '_day_' + i" :options="reminder" />
            </div>
            <div class="actions">
                <c-reminder-actions @add="$emit('addReminder', { dateTime: dayjs(date) })" @clear="$emit('clearDayReminders', { dateTime: dayjs(date) })"></c-reminder-actions>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.calendar-day-container{
    display: block;
    flex: 0 0 auto;
    width: 14.28%;
    max-width: 100%;
    // max-height: 100px;
    text-align: center;

    background: transparent;
    border-top: none;
    border-left: none;
    border-right: 1px solid var(--color-background-soft);
    border-bottom: 1px solid var(--color-background-soft);

    color: var(--color-text);
    .calendar-day-block{
        height: 100%;
        span{
            display: block;
        }
        .day-of-week{
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .actions{
            position: absolute;
            bottom: 9px;
            width: 100%;
            display: none;
            background-image: linear-gradient(transparent, var(--color-background-soft), var(--color-background-soft), var(--color-background-soft));
        }
        .day-of-month{
            span{
                display: inline-block;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                font-weight: 700;
            }
            .today-active{
                background: var(--color-primary);
                color: var(--color-background-soft);
            }
        }
        .reminders{
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 5px;
            padding-bottom: 40px;
            text-align: start;
            overflow: auto;
            display: none;
            max-height: 10px;
            max-height: calc(((100vh - 56px) / 5) - 70px);
            scrollbar-width: none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar{
                display: none;
            }
        }
        &:not(.smaller-reminders){
            .reminders{
                max-height: calc(((100vh - 56px) / 5) - 50px);
            }
        }
    }
    &:not(.disabled){
        &:hover{
            background: var(--color-background-soft);
            transform: scale(1.06);
            z-index: 10;
            .actions{
                display: block;
            }
        }
        .reminders{
            display: block;
        }
    }
}
</style>