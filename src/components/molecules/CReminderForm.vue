<script setup>
import { ref } from 'vue'
import CButton from "@/components/atoms/CButton.vue";
import CInput from "@/components/atoms/CInput.vue";

const payload = ref({
    title: null
})
</script>

<template>
    <form @submit.prevent="$emit('submitData', payload)">
        <div class="form-group">
            <c-input class="form-item" type="text" placeholder="Reminder Title" v-model="payload.title"/>
            <c-button type="submit" class="form-item" darker size="lg">Submit</c-button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form-group{
    display: flex;
    display: -webkit-flex;
    margin-top: 40px;
    margin-bottom: 40px;
    .form-item{
        width: 50%;
        &:nth-child(odd){
            margin-right: 20px;
        }
        &:nth-child(even){
            margin-left: 20px;
        }
    }
}
</style>