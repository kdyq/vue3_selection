<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setbutton></Setbutton>
        </div>
    </div>
</template>

<script setup lang="ts" name="tabbar">
import Setbutton from "./setbutton/index.vue";
import Breadcrumb from "./breadcrumb/index.vue";
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>