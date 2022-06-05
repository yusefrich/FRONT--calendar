<script setup>
import CButton from "@/components/atoms/CButton.vue";
</script>

<template>
    <div class="action-container transition">
        <c-button @click="$emit('add')" darker rounded>
            <ac-icon solid>plus</ac-icon>
        </c-button>
        <c-button darker>
            <small><ac-icon solid>trash</ac-icon> Clear All</small>
        </c-button>
    </div>
</template>

<style lang="scss" scoped>
    .action-container{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        width: 100%;
        margin-top: 2px;
        margin-bottom: 4px;
        padding-top: 10px;
        button{
            margin-left: 5px;
            margin-right: 5px;
        }
    }
</style>