<script setup>
import CButton from "@/components/atoms/CButton.vue";
</script>

<template>
    <div class="modal-container">
        <div class="modal-content-wrapper">
            <div class="modal-heading">
                <h2>New Reminder</h2>
                <c-button @click="$emit('close')">
                    <ac-icon solid>times</ac-icon>
                </c-button>
            </div>
            <div class="modal-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-container{
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: var(--color-background-blur);
    .modal-content-wrapper{
        background: var(--color-background-soft);
        margin: 50px;
        padding: 20px;
        border-radius: 10px;
        .modal-heading{
            padding: 3px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
        }
    }
}
</style>