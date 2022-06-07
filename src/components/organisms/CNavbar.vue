<script setup>
import CButton from "@/components/atoms/CButton.vue";
defineProps({
    currentMonth: {
        type: String,
    },
    currentYear: {
        type: Number,
    },
});
</script>

<template>
    <nav class="navbar">
        <div class="container-fluid d-flex">
            <div>
                <c-button @click="$emit('toggleSidebar')">
                    <ac-icon solid>bars</ac-icon>
                </c-button>
                <c-button @click="$emit('prevMonth')">
                    <ac-icon solid>chevron-left</ac-icon>
                </c-button>
                <c-button @click="$emit('nextMonth')">
                    <ac-icon solid>chevron-right</ac-icon>
                </c-button>
            </div>
            <h4 class="current-month">{{ currentMonth }} - {{ currentYear }}</h4>
            <c-button @click="$emit('clearAllReminders')">
                Clear all
            </c-button>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.current-month{
    font-weight: 700;
    margin-top: 5px;
}
.navbar{
    padding: 10px;
    border-bottom: 1px solid var(--color-background-soft);
}
.d-flex{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
</style>