<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue"
import dayjs from 'dayjs'
import CButton from "@/components/atoms/CButton.vue";
import CInput from "@/components/atoms/CInput.vue";
import openWeatherService from '@/services/openWeatherService'

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
    lat: null,
    lon: null,
    color: '#4d68dd',
    done: false,
})
const date = ref('')
const time = ref('')
const city = ref('')
const timeout = ref(null)
const loading = ref(false)
const cityOptions = ref(null)

watch(city, (value) => {
    if (value === '') {
        cityOptions.value = null;
    }
    if (value !== payload.value.city) {
        if (timeout.value) {
            clearTimeout(timeout.value)
        }
        timeout.value = setTimeout(async () => {
            loading.value = true
            const [data, err] = await openWeatherService.getCoordinates(value)
            loading.value = false
            if (!err) {
                cityOptions.value = data
            }
        }, 1000)
    }
})

onBeforeMount(() => {
    if (!props.reminder) {
        return
    }
    city.value = props.reminder.hasOwnProperty('city') ? props.reminder.city : null
})

onMounted(() => {
    if (!props.reminder) {
        return
    }
    payload.value.id = props.reminder.hasOwnProperty('id') ? props.reminder.id : null;
    payload.value.title = props.reminder.hasOwnProperty('title') ? props.reminder.title : null;
    payload.value.dateTime = props.reminder.hasOwnProperty('dateTime') ? props.reminder.dateTime : null;
    payload.value.city = props.reminder.hasOwnProperty('city') ? props.reminder.city : null;
    payload.value.color = props.reminder.hasOwnProperty('color') ? props.reminder.color : '#4d68dd';
    payload.value.done = props.reminder.hasOwnProperty('done') ? props.reminder.done : false;
    payload.value.lat = props.reminder.hasOwnProperty('lat') ? props.reminder.lat : false;
    payload.value.lon = props.reminder.hasOwnProperty('lon') ? props.reminder.lon : false;

    if (payload.value.dateTime) {
        date.value = dayjs(payload.value.dateTime).format('YYYY-MM-DD')
        time.value = dayjs(payload.value.dateTime).format('HH:mm')
    }
})

/**
 * @name formatPayload
 * @description Format the payload with the corrent date time.
 * @param {Object} submitPayload payload containing the reminder
 * @param {String} submitDate date selected by the user to save a reminder
 * @param {String} submitTime time selected by the user to save a reminder
 * @return {Object} payload container the reminder with a valid dateTime
 */
function formatPayload(submitPayload, submitDate, submitTime) {
    submitPayload.dateTime = dayjs(submitDate + 'T' + submitTime)
    return submitPayload
}
/**
 * @name selectCity
 * @description called after the user select a city for the autocompleate options to save the selected city in the payload that will be send to the state.
 * @param {Object} option payload containing the reminder
 */
function selectCity(option) {
    payload.value.city = option.name;
    payload.value.lat = option.lat;
    payload.value.lon = option.lon;
    city.value = option.name;
    cityOptions.value = null;
    if (timeout.value) {
        clearTimeout(timeout.value)
    }
}
</script>

<template>
    <form @submit.prevent="$emit('submitData', formatPayload(payload, date, time))">
        <!-- <code>{{cityOptions}}</code> -->
        <div class="form-group">
            <div class="form-item">
                <c-input required class="w-100" type="text" placeholder="Reminder Title" maxlength="30" v-model="payload.title"/>
                <span class="form-item-info"><small>Max of 30 chars</small></span>
            </div>
            <c-input required class="form-item" type="date" placeholder="Reminder Date" v-model="date"/>
            <c-input required class="form-item" type="time" placeholder="Reminder Time" v-model="time"/>
            <div class="form-item">
                <c-input hidden class="w-100" required type="text" placeholder="City of this reminder" v-model="payload.city"/>
                <c-input class="w-100" required type="text" placeholder="City of this reminder" maxlength="20" v-model="city"/>
                <span class="form-item-info"><small>Use the field to search for a city and select the correct one</small></span>
                <div  v-if="cityOptions" class="city-suggestions">
                    <c-button @click="selectCity(option)" v-for="(option, index) in cityOptions" :key="'list_of_autocompleate_' + index" class="city-sug" darker>{{ option.name }}</c-button>
                    <span v-if="loading" class="loading">
                        <ac-icon class="spin" solid>spinner</ac-icon>
                    </span>
                </div>
            </div>
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
        position: relative;
        width: calc(50% - 20px);
        flex: 0 0 auto;
        margin-bottom: 30px;
        text-align: start;
        .form-item-info{
            font-size: 12px;
        }
        &:nth-child(odd){
            margin-right: 20px;
        }
        &:nth-child(even){
            margin-left: 20px;
        }
        .city-suggestions{
            width: 100%;
            position: absolute;
            // transform: translateY(0%);
            background: var(--color-background);
            border-radius: 10px;
            padding: 15px;
            z-index: 30;
            max-height: 300px;
            overflow: auto;
            .city-sug{
                display: block;
                width: 100%;
                text-align: start;
                margin-bottom: 10px;
                background: var(--color-background-soft);
            }
        }
    }
}
.w-100{
    width: 100%;
}
.spin{
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>