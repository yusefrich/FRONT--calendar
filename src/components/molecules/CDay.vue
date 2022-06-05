<script setup>
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
</script>
<template>
    <div class="calendar-day-container transition" :class="{disabled: !date}">
        <div class="calendar-day-block">
            <span class="day-of-week">{{ week }}</span>
            <span class="day-of-month">
                <span :class="{'today-active': dayjs().format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY')}">
                    {{ day }}
                </span>
            </span>
            <div class="reminders">
                <!-- <c-reminder text="short text" />
                <c-reminder text="mid text hds asuhks ss" />
                <c-reminder text="mid text hds asuhks ss" />
                <c-reminder text="mid text hds asuhks ss" /> -->
                <!-- <c-reminder text="max text hsuei hs uifvbtu u od" />
                <c-reminder text="short text" />
                <c-reminder text="mid text hds asuhks ss" />
                <c-reminder text="max text hsuei hs uifvbtu u od" />
                <c-reminder text="short text" />
                <c-reminder text="mid text hds asuhks ss" />
                <c-reminder text="max text hsuei hs uifvbtu u od" />
                <c-reminder text="short text" />
                <c-reminder text="mid text hds asuhks ss" />
                <c-reminder text="max text hsuei hs uifvbtu u od" /> -->
            </div>
            <div class="actions">
                <c-reminder-actions></c-reminder-actions>
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
            background: #fafafa2d;
            height: calc(100% - 45px);
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 5px;
            text-align: start;
            // max-height: 10vh;
            // overflow: auto;
        }
    }
    &:not(.disabled):hover{
        background: var(--color-background-soft);
        transform: scale(1.06);
        z-index: 10;
        .actions{
            display: block;
        }
    }
}
</style>