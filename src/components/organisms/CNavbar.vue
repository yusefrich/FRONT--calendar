<script setup>
import CButton from "@/components/atoms/CButton.vue";
defineProps({
    currentMonth: {
        type: String,
    },
});
</script>

<template>
    <nav class="navbar">
        <div class="container-fluid d-flex">
            <c-button @click="$emit('toggleSidebar')">
                <ac-icon solid>bars</ac-icon>
            </c-button>
            <h4 class="current-month">{{ currentMonth }}</h4>
            <c-button>
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