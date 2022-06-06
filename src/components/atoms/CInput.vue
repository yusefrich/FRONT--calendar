<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
    required: {
        type: Boolean,
    },
    hidden: {
        type: Boolean,
    },
    placeholder: {
        type: String,
        default: '',
    },
    maxlength: {
        type: String,
    },
    modelValue: {
        type: String
    },
});
const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

</script>

<template>
    <input class="transition" :type="type" :hidden="hidden" :required="required" :placeholder="placeholder" :value="modelValue" :maxlength="maxlength" @input="updateValue">
</template>

<style lang="scss" scoped>
input{
    color: var(--color-text);
    font-size: 17px;
    height: 28px;
    position: relative;
    top: 0;
    background-color: transparent;
    border: none;
    line-height: 24px;
    outline: none;
    border-bottom: 1px solid var(--color-text);
    &:focus{
        border-bottom: 1px solid var(--color-primary);
    }
}
</style>