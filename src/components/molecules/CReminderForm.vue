<script setup>
import { ref, onMounted } from "vue"
import dayjs from 'dayjs'
import CButton from "@/components/atoms/CButton.vue";
import CInput from "@/components/atoms/CInput.vue";

const props = defineProps({
    reminder: {
        type: Object,
    },
});

const payload = ref({
    id: null,
    title: null,
    dateTime: null,
    city: null,
    color: '#4d68dd',
    done: false,
})
const date = ref('')
const time = ref('')

onMounted(() => {
    if (!props.reminder) {
        return
    }
    payload.value.id = props.reminder.hasOwnProperty('id') ? props.reminder.id : null
    payload.value.title = props.reminder.hasOwnProperty('title') ? props.reminder.title : null
    payload.value.dateTime = props.reminder.hasOwnProperty('dateTime') ? props.reminder.dateTime : null
    payload.value.city = props.reminder.hasOwnProperty('city') ? props.reminder.city : null
    payload.value.color = props.reminder.hasOwnProperty('color') ? props.reminder.color : '#4d68dd'
    payload.value.done = props.reminder.hasOwnProperty('done') ? props.reminder.done : false

    if (payload.value.dateTime) {
        date.value = dayjs(payload.value.dateTime).format('YYYY-MM-DD')
        time.value = dayjs(payload.value.dateTime).format('HH:mm')
    }
})

function formatPayload(submitPayload, submitDate, submitTime) {
    submitPayload.dateTime = dayjs(submitDate + 'T' + submitTime)
    return submitPayload
}
</script>

<template>
    <form @submit.prevent="$emit('submitData', formatPayload(payload, date, time))">
        <div class="form-group">
            <c-input required class="form-item" type="text" placeholder="Reminder Title" v-model="payload.title"/>
            <c-input required class="form-item" type="date" placeholder="Reminder Date" v-model="date"/>
            <c-input required class="form-item" type="time" placeholder="Reminder Time" v-model="time"/>
            <c-input required class="form-item" type="text" placeholder="City of this reminder" v-model="payload.city"/>
            <c-input required class="form-item" type="color" placeholder="color" v-model="payload.color"/>
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
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    .form-item{
        width: calc(50% - 20px);
        flex: 0 0 auto;
        margin-bottom: 30px;
        &:nth-child(odd){
            margin-right: 20px;
        }
        &:nth-child(even){
            margin-left: 20px;
        }
    }
}
</style>