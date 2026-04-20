<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts" name="mainPage">
import { ref, watch, nextTick } from 'vue';
import { useLayoutStore } from '@/store/modules/layout';
const layoutStore = useLayoutStore();
const flag = ref(true);//用于控制组件的销毁重建
watch(() => layoutStore.refresh, () => {
    // 组件销毁重建
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})
</script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>