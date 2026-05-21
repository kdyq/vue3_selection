<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">
                <div class="left">
                    <!-- 游客组件 -->
                    <Tourist class="tourist"></Tourist>
                    <!-- 性别组件 -->
                    <Sex class="sex"></Sex>
                    <!-- 年龄组件 -->
                    <Age class="age"></Age>
                </div>
                <div class="content">
                    <Map class="map"></Map>
                    <Line class="line" />
                </div>
                <div class="right">右侧</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="screen">
import { ref, onMounted, onUnmounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/left/tourist/index.vue'
import Sex from './components/left/sex/index.vue'
import Age from './components/left/age/index.vue'
import Map from './components/center/map/index.vue'
import Line from './components/center/line/index.vue'
const screen = ref()
let timer: ReturnType<typeof setTimeout> | null = null

// 缩放函数
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const hh = window.innerHeight / h
    return ww < hh ? ww : hh
}

// 应用缩放
function applyScale() {
    if (screen.value) {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    }
}

// 带防抖的 resize 处理
function handleResize() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        applyScale()
    }, 300)
}

onMounted(() => {
    applyScale()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (timer) clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    overflow: hidden;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;

        .top {
            width: 100%;
            height: 40px;
            position: relative;
            z-index: 30;
        }

        .bottom {
            display: flex;
            width: 100%;
            height: 1040px;
            position: relative;
            overflow: hidden;

            .left {
                flex: 1;
                height: 1040px;
                display: flex;
                flex-direction: column;
                position: relative;
                z-index: 20;
            }

            .content {
                flex: 2.6; // 原来是 2，调大
                height: 1040px;
                display: flex;
                flex-direction: column;
                position: relative;
                z-index: 5;
                overflow: hidden;

                .map {
                    flex: 4; // 可以稍微大一点
                    width: 100%;
                    min-height: 0;
                    pointer-events: auto;
                    position: relative;
                    z-index: 5;
                }

                .line {
                    flex: 1.1;
                    width: 100%;
                    min-height: 0;
                    position: relative;
                    z-index: 6;
                }
            }

            .right {
                flex: 1; // 右侧变窄，中间地图变宽
                height: 1040px;
                position: relative;
                z-index: 20;
            }
        }
    }
}
</style>