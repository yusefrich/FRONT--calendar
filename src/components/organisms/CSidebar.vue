<script setup>
import CReminder from "@/components/molecules/CReminder.vue";
import CReminderActions from "@/components/molecules/CReminderActions.vue";
</script>

<template>
    <div class="sidebar-container">
        <div class="reminders-heading">
            <span>Today Reminders</span>
        </div>
        <c-reminder text="short text" />
        <c-reminder text="mid text hds asuhks ss" />
        <c-reminder text="max text hsuei hs uifvbtu u od" />
        <c-reminder text="short text" />
        <c-reminder text="mid text hds asuhks ss" />
        <c-reminder text="max text hsuei hs uifvbtu u od" />
        <c-reminder text="short text" />
        <c-reminder text="mid text hds asuhks ss" />
        <c-reminder text="max text hsuei hs uifvbtu u od" />
        <c-reminder text="short text" />
        <c-reminder text="mid text hds asuhks ss" />
        <c-reminder text="max text hsuei hs uifvbtu u od" />
        <div class="actions">
            <c-reminder-actions></c-reminder-actions>
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