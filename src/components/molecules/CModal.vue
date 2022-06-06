<script setup>
import CButton from "@/components/atoms/CButton.vue";

defineProps({
    title: {
        type: String,
    },
    done: {
        type: Boolean,
    },
});

</script>

<template>
    <div class="modal-container">
        <div class="modal-content-wrapper">
            <div class="modal-heading">
                <h2 :class="{ done: done }">{{title}}</h2>
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
    z-index: 20;
    text-align: center;
    text-align: -webkit-center;
    .modal-content-wrapper{
        background: var(--color-background-soft);
        margin: 50px;
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        .modal-heading{
            padding: 3px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            .done{
                text-decoration: line-through;
            }
        }
    }
}
</style>