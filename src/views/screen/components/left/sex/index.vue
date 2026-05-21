<template>
    <div class="sex-box">
        <div class="top">
            <p class="title">性别比例</p>
            <p class="bg"></p>
        </div>
        <div class="sex">
            <div class="male">
                <span class="sex-label">男士</span>
                <img src="../../../images/man.png" alt="">
            </div>
            <div class="famale">
                <span class="sex-label">女士</span>
                <img src="../../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="bar" ref="bar">
        </div>
    </div>
</template>

<script setup lang="ts" name="screen-tourist">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
const bar = ref()

onMounted(() => {
    nextTick(() => {
        const myChart = echarts.init(bar.value)

        myChart.setOption({
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                borderColor: 'transparent',
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                formatter(params: any) {
                    const valueMap: Record<string, number> = {
                        男士: 58,
                        女士: 42
                    }

                    return `${params.marker}${params.seriesName}：${valueMap[params.seriesName]}%`
                }
            },
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            xAxis: {
                type: 'value',
                max: 100,
                show: false
            },
            yAxis: {
                type: 'category',
                data: [''],
                show: false
            },
            series: [
                {
                    name: '女士',
                    type: 'bar',
                    data: [100],
                    barWidth: 16,
                    cursor: 'pointer',
                    itemStyle: {
                        color: '#ff4f7b',
                        borderRadius: 8
                    },
                    emphasis: {
                        itemStyle: {
                            opacity: 0.85,
                            shadowBlur: 8,
                            shadowColor: '#ff4f7b'
                        }
                    },
                    z: 1
                },
                {
                    name: '男士',
                    type: 'bar',
                    data: [58],
                    barWidth: 16,
                    barGap: '-100%',
                    cursor: 'pointer',
                    itemStyle: {
                        color: '#007afe',
                        borderRadius: 8
                    },
                    emphasis: {
                        itemStyle: {
                            opacity: 0.85,
                            shadowBlur: 8,
                            shadowColor: '#007afe'
                        }
                    },
                    z: 2
                }
            ]
        })

        myChart.resize()

        window.addEventListener('resize', () => {
            myChart.resize()
        })
    })
})
</script>

<style lang="scss" scoped name="screen-sex">
.sex-box {
    width: 100%;
    height: 100%;
    background: url(../../../images/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;
    margin: 25px 0;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        .male,
        .famale {
            position: relative;

            .sex-label {
                position: absolute;
                top: 7px;
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                font-size: 13px;
                font-weight: 700;
                line-height: 1;
                text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
            }
        }

        .male {
            margin: 20px 30px;
            width: 111px;
            height: 115px;
            background: url(../../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .famale {
            margin: 20px 30px;
            width: 111px;
            height: 115px;
            background: url(../../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        width: 260px;
        margin: -5px auto 6px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 13px;
        font-weight: 700;

        p {
            margin: 0;
        }
    }

    .bar {
        width: 260px;
        height: 18px;
        margin: 0 auto;
    }
}
</style>