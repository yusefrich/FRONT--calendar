<script setup>
import { inject } from 'vue'
import CButton from "@/components/atoms/CButton.vue";

const props = defineProps({
    options: {
        type: Object,
    },
});

const emitter = inject('emitter');
/**
 * @name openReminder
 * @description Emit a global event to be listened by the Home template.
 * @param {Object} payload payload container the reminder
 */
function openReminder(payload) {
    emitter.emit("open-reminder", payload);
}
/**
 * @name deleteDayReminders
 * @description Emit a global event to be listened by the Home template.
 * @param {Object} payload payload container the reminder
 */
function editReminder(payload) {
    emitter.emit("edit-reminder", payload);
}
/**
 * @name deleteDayReminders
 * @description Emit a global event to be listened by the Home template.
 * @param {Object} payload payload container the reminder
 */
function clearReminder(payload) {
    emitter.emit("clear-reminder", payload);
}
/**
 * @name deleteDayReminders
 * @description Emit a global event to be listened by the Home template.
 * @param {Object} payload payload container the reminder
 */
function toggleDoneReminder(payload) {
    emitter.emit("toggle-done-reminder", payload);
}
</script>

<template>
    <div :style="`background: ${options.color}`" class="reminder-container">
        <c-button @click="toggleDoneReminder(options)" class="reminder-done mr-2">
            <small><ac-icon solid>check</ac-icon></small>
        </c-button>
        <c-button @click="openReminder(options)" transparent class="reminder-text" :class="{done: options.done}">{{options.title}}</c-button>
        <div class="reminder-actions">
            <c-button @click="editReminder(options)" class="reminder-action mr-2">
                <small><ac-icon solid>pen</ac-icon></small>
            </c-button>
            <c-button @click="clearReminder(options)" class="reminder-action">
                <small><ac-icon solid>trash</ac-icon></small>
            </c-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mr-2{
    margin-right: 2px;
}
.reminder-container{
    display: block;
    background: var(--color-primary);
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 0px 2px;
    display: flex;
    display: -webkit-flex;
    .reminder-text{
        text-align: start;
        padding: 0;
        font-size: 12px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.done{
            text-decoration: line-through;
        }
    }
    .reminder-actions{
        display: flex;
        display: -webkit-flex;
    }
    .reminder-action{
        padding: 4px;
        display: none;
    }
    .reminder-done{
        padding: 4px;
    }
    &:hover{
        .reminder-action{
            display: inline-flex;
            display: -webkit-inline-flex;
        }
    }
}
</style>