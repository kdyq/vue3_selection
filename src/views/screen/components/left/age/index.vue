<template>
    <div class="age-box">
        <div class="top">
            <p class="title">年龄比例</p>
            <p class="bg"></p>
        </div>
        <div class="pie" ref="pie"></div>
    </div>

</template>

<script setup lang="ts" name="screen-age">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const pie = ref()
onMounted(() => {
    const myChart = echarts.init(pie.value)
    const ageData = [
        { value: 16, name: '10岁以下' },
        { value: 8, name: '10 - 18岁' },
        { value: 12, name: '18 - 30岁' },
        { value: 24, name: '30 - 40岁' },
        { value: 20, name: '40 - 60岁' },
        { value: 20, name: '60岁以上' }
    ]

    const colorList = [
        '#f7c94b',
        '#ff7f2a',
        '#16a3b8',
        '#0b66c3',
        '#67c8e8',
        '#8d5bd6'
    ]

    const option = {
        color: colorList,
        tooltip: {
            trigger: 'item',
            formatter: '{b}：{d}%'
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            itemWidth: 20,
            itemHeight: 20,
            itemGap: 12,
            icon: 'roundRect',
            textStyle: {
                color: '#fff',
                fontSize: 16,
                rich: {
                    name: {
                        width: 70,
                        color: '#fff',
                        fontSize: 16
                    },
                    value: {
                        width: 35,
                        align: 'right',
                        color: '#fff',
                        fontSize: 15
                    }
                }
            },
            formatter(name: string) {
                const item = ageData.find(item => item.name === name)
                return `{name|${name}}{value|${item?.value}%}`
            }
        },
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: '34%',
                    top: '48%',
                    style: {
                        text: '本日总数',
                        fill: '#9fa8da',
                        fontSize: 15,
                        textAlign: 'center',
                        textVerticalAlign: 'middle'
                    }
                }
            ]
        },
        series: [
            {
                name: '年龄比例',
                type: 'pie',
                radius: ['35%', '90%'],
                center: ['40%', '52%'],
                avoidLabelOverlap: false,
                padAngle: 2,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#10145a',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{d}%',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                emphasis: {
                    scale: true,
                    scaleSize: 8,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.35)'
                    }
                },
                labelLine: {
                    show: false
                },
                data: ageData
            }
        ]
    }
    myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
.age-box {
    width: 100%;
    height: 100%;
    background: url(../../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

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

    .pie {
        width: 100%;
        height: 230px;
    }
}
</style>