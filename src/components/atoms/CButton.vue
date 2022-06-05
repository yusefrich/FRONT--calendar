<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    darker: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'md',
    },
    transparent: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button :type="type" class="btn transition" :class="[{'btn-darker': darker, 'btn-rounded': rounded, 'btn-transparent': transparent}, `btn-${size}`]">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.btn{
    background: transparent;
    border: none;
    color: var(--color-text);
    padding: 10px;
    border-radius: 10px;
    &:hover{
        background: var(--color-background-soft);
        cursor: pointer;
        transform: scale(1.1);
    }
}
.btn-darker:hover{
    background: var(--color-background-mute);
}
.btn-rounded{
    border-radius: 50%;
}
.btn-transparent:hover{
    background: transparent;
    transform: scale(1);
}
.btn-lg{
    font-size: 17px;
}
</style>
