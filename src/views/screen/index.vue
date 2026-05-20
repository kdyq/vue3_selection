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
                <div class="content">内容</div>
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
        }

        .bottom {
            display: flex;

            .left {
                flex: 1;
                height: 1040px;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex: 1.3;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }
            }

            .content {
                flex: 2;
            }

            .right {
                flex: 1;
            }
        }
    }

}
</style>