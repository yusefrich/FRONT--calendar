<script setup>
import { ref, inject, onMounted } from 'vue'
import dayjs from "dayjs"
import CButton from "@/components/atoms/CButton.vue";
import CWeatherCard from "@/components/atoms/CWeatherCard.vue";
import openWeatherService from '@/services/openWeatherService'

const props = defineProps({
    reminder: {
        type: Object,
    },
});

const emitter = inject('emitter');
const weatherList = ref([])

function toggleDoneReminder(payload) {
    emitter.emit("toggle-done-reminder", payload);
}
function clearReminder(payload) {
    emitter.emit("clear-reminder", payload);
}
function checkValidDay(reminderDate, weatherDate) {
    return new Date(weatherDate).getDate() >= new Date(reminderDate).getDate()
}

onMounted(async () => {
    if (!props.reminder || !props.reminder.lat || !props.reminder.lon) {
        return
    }
    const [data, err] = await openWeatherService.getWeather(props.reminder.lat, props.reminder.lon)
    if (err) {
        console.error('Error while getting the weather', err)
        return
    }
    weatherList.value = data.list
})
</script>

<template>
    <div class="reminder-view-container">
        <h3>{{ reminder.city }}</h3>
        <p>{{ dayjs(reminder.dateTime).format('dddd, DD MMM YYYY') }}</p>
        <p><small><ac-icon class="icon-margin" solid>clock</ac-icon>{{dayjs(reminder.dateTime).format('HH:MM')}}</small></p>
        <div class="weather">
            <template v-for="(weather, i) in weatherList">
                <c-weather-card
                    v-if="checkValidDay(reminder.dateTime, weather.dt_txt)"
                    :key="'weather_list_city_' + i"
                    :dateTime="weather.dt_txt"
                    :icon="weather.weather[0].icon"
                    :max="weather.main.temp_max"
                    :min="weather.main.temp_min"
                />
            </template>
        </div>
        <div class="reminder-options">
            <div :style="`background: ${reminder.color}`" class="reminder-collor"></div>
            <div>
                <c-button @click="$emit('edit')" darker><ac-icon class="icon-margin" solid>pen</ac-icon>Edit</c-button>
                <c-button @click="toggleDoneReminder(reminder)" darker><ac-icon class="icon-margin" solid>check</ac-icon>Done</c-button>
                <c-button @click="clearReminder(reminder)" darker>
                    <span>
                        <ac-icon class="icon-margin" solid>trash</ac-icon>Clear
                    </span>
                </c-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.reminder-view-container{
    text-align: start;
    .weather{
        display: flex;
        display: -webkit-flex;
        overflow: auto;
        scrollbar-color: #d4aa70 #e4e4e4;
        scrollbar-width: thin;
        padding-top: 20px;
        padding-bottom: 20px;
        &::-webkit-scrollbar{
            width: 10px;
            height: 10px;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--color-background);
            border-radius: 100px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-image: linear-gradient(180deg, var(--color-secondary) 0%, var(--color-primary) 99%);
            box-shadow: inset 2px 2px 5px 0 rgba(var(--color-background), 0.5);
        }
    }
    .icon-margin{
        margin-right: 10px;
    }
    .reminder-options{
        margin-top: 30px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        .reminder-collor{
            width: 30px;
            height: 30px;
            background: var(--color-background);
            border-radius: 50%;
        }
        button{
            margin-right: 10px;
        }
    }
}
</style>