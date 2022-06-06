<script setup>
import dayjs from 'dayjs'
const props = defineProps({
    reminder: {
        type: Object,
    },
    icon: {
        type: String
    },
    max: {
        type: Number
    },
    min: {
        type: Number
    },
    dateTime: {
        type: String
    },
});
</script>

<template>
    <div class="weather-container">
        <p><small>{{ dayjs(dateTime).format('ddd. DD MMM') }}</small></p>
        <p><small>{{ dayjs(dateTime).format('HH:MM') }}</small></p>
        <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`" alt="weather icon">
        <span class="max"><small>{{max}}°</small></span>
        <span class="min"><small>{{min}}°</small></span>
    </div>
</template>

<style lang="scss" scoped>
.weather-container{
    text-align: center;
    margin-right: 15px;
    img{
        width: 65px;
        height: auto;
    }
    .max{
        margin-right: 3px;
    }
    .min{
        opacity: .7;
    }
}
</style>