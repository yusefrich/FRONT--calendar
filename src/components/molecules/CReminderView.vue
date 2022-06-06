<script setup>
import { ref, inject } from 'vue'
import dayjs from "dayjs"
import CButton from "@/components/atoms/CButton.vue";

defineProps({
    reminder: {
        type: Object,
    },
});

const emitter = inject('emitter');

function toggleDoneReminder(payload) {
    emitter.emit("toggle-done-reminder", payload);
}
function clearReminder(payload) {
    emitter.emit("clear-reminder", payload);
}
</script>

<template>
    <div class="reminder-view-container">
        <h3>{{reminder.city}}</h3>
        <p>{{dayjs(reminder.dateTime).format('dddd, DD MMM YYYY')}}</p>
        <p><small><ac-icon class="icon-margin" solid>clock</ac-icon>{{dayjs(reminder.dateTime).format('HH:MM')}}</small></p>
        <div class="reminder-options">
            <div class="reminder-collor"></div>
            <div>
                <c-button @click="$emit('edit')" darker><ac-icon class="icon-margin" solid>pen</ac-icon>Edit</c-button>
                <c-button @click="toggleDoneReminder(reminder)" darker><ac-icon class="icon-margin" solid>check</ac-icon>Done</c-button>
                <c-button @click="clearReminder(reminder)" darker>
                    <span>
                        <ac-icon class="icon-margin" solid>trash</ac-icon>Clear
                    </span>
                </c-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.reminder-view-container{
    text-align: start;
    .icon-margin{
        margin-right: 10px;
    }
    .reminder-options{
        margin-top: 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .reminder-collor{
            width: 30px;
            height: 30px;
            background: var(--color-primary);
            border-radius: 50%;
        }
        button{
            margin-right: 10px;
        }
    }
}
</style>