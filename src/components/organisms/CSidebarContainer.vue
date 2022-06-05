<script setup>
import CSidebar from "@/components/organisms/CSidebar.vue";
defineProps({
    sidebar: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div class="split-container" :class="{active: sidebar}">
        <div class="sidebar transition">
            <c-sidebar />
        </div>
        <div class="content transition">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.split-container{
    display: flex;
    display: -webkit-flex;
    width: 100%;
    .sidebar{
        border-right: 1px solid var(--color-background-soft);
        width: 0;
        overflow: hidden;
        // transform: translateX(-100%);
        left: -20%;
    }
    .content{
        width: 100%;
    }
    &.active{
        .sidebar{
            width: 20%;
            left: 0;
        }
        .content{
            width: 80%;
        }
    }
}
</style>