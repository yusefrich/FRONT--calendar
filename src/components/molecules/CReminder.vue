<script setup>
import CButton from "@/components/atoms/CButton.vue";
defineProps({
    text: {
        type: String,
    },
});
</script>

<template>
    <div class="reminder-container">
        <c-button class="reminder-done mr-2">
            <small><ac-icon solid>check</ac-icon></small>
        </c-button>
        <c-button transparent class="reminder-text">{{text}}</c-button>
        <div class="reminder-actions">
            <c-button class="reminder-action mr-2">
                <small><ac-icon solid>pen</ac-icon></small>
            </c-button>
            <c-button class="reminder-action">
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