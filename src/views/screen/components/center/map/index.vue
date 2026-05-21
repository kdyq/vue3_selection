<template>
    <div class="map-box">
        <!-- 顶部预警信息 -->
        <div class="warn-bar">
            <span>平台高峰预警信息（2条）</span>
            <i></i>
            <i></i>
            <i></i>
        </div>

        <!-- 左侧标题 -->
        <div class="map-title">景区实时客流量</div>

        <!-- 地图 -->
        <div class="map" ref="mapRef"></div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './China.json'

const mapRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

echarts.registerMap('china', chinaJson as any)

const geoCoordMap: Record<string, [number, number]> = {
    北京市: [116.405285, 39.904989],
    上海市: [121.472644, 31.231706],
    天津市: [117.190182, 39.125596],
    重庆市: [106.504962, 29.533155],
    河北省: [114.502461, 38.045474],
    山西省: [112.549248, 37.857014],
    辽宁省: [123.429096, 41.796767],
    吉林省: [125.3245, 43.886841],
    黑龙江省: [126.642464, 45.756967],
    江苏省: [118.767413, 32.041544],
    浙江省: [120.153576, 30.287459],
    安徽省: [117.283042, 31.86119],
    福建省: [119.306239, 26.075302],
    江西省: [115.892151, 28.676493],
    山东省: [117.000923, 36.675807],
    河南省: [113.665412, 34.757975],
    湖北省: [114.298572, 30.584355],
    湖南省: [112.982279, 28.19409],
    广东省: [113.280637, 23.125178],
    海南省: [110.33119, 20.031971],
    四川省: [104.065735, 30.659462],
    贵州省: [106.713478, 26.578343],
    云南省: [102.712251, 25.040609],
    陕西省: [108.948024, 34.263161],
    甘肃省: [103.823557, 36.058039],
    青海省: [101.778916, 36.623178],
    台湾省: [121.509062, 25.044332],
    内蒙古自治区: [111.670801, 40.818311],
    广西壮族自治区: [108.320004, 22.82402],
    西藏自治区: [91.132212, 29.660361],
    宁夏回族自治区: [106.278179, 38.46637],
    新疆维吾尔自治区: [87.617733, 43.792818],
    香港: [114.173355, 22.320048],
    澳门: [113.54909, 22.198951]
}

const centerCity = '北京市'

const flightToBeijing = [
    { name: '新疆维吾尔自治区', value: 85 },
    { name: '西藏自治区', value: 42 },
    { name: '甘肃省', value: 65 },
    { name: '陕西省', value: 72 },
    { name: '四川省', value: 58 },
    { name: '云南省', value: 44 },
    { name: '广东省', value: 91 },
    { name: '上海市', value: 88 },
    { name: '江苏省', value: 76 },
    { name: '浙江省', value: 69 },
    { name: '山东省', value: 80 },
    { name: '辽宁省', value: 61 }
]

const flightFromBeijing = [
    { name: '河北省', value: 66 },
    { name: '山西省', value: 55 },
    { name: '河南省', value: 78 },
    { name: '湖北省', value: 57 },
    { name: '湖南省', value: 50 },
    { name: '福建省', value: 63 },
    { name: '江西省', value: 46 },
    { name: '安徽省', value: 59 },
    { name: '黑龙江省', value: 41 },
    { name: '吉林省', value: 40 }
]

const convertLineData = (
    data: Array<{ name: string; value: number }>,
    reverse = false
) => {
    const centerCoord = geoCoordMap[centerCity]

    return data
        .map(item => {
            const fromCoord = geoCoordMap[item.name]
            if (!fromCoord || !centerCoord) return null

            return {
                fromName: reverse ? centerCity : item.name,
                toName: reverse ? item.name : centerCity,
                coords: reverse ? [centerCoord, fromCoord] : [fromCoord, centerCoord],
                value: item.value
            }
        })
        .filter(Boolean)
}

// 飞机 SVG path，不需要下载图片
const planePath =
    'path://M29.5 16.5c0-.9-.7-1.6-1.6-1.6H18L14.1 3.2c-.2-.7-.8-1.2-1.6-1.2H9.7l2.2 12.9H5.6L3.7 10.8H1.6l1.1 6.1-1.1 6.1h2.1l1.9-4.1h6.3L9.7 31.8h2.8c.7 0 1.4-.5 1.6-1.2L18 18.9h9.9c.9 0 1.6-.7 1.6-1.6v-.8z'
const provinceLabelData = ((chinaJson as any).features || [])
    .map((feature: any) => {
        const properties = feature.properties || {}
        const coord = properties.centroid || properties.center

        if (!coord) return null

        return {
            name: properties.name,
            value: [coord[0], coord[1]]
        }
    })
    .filter(Boolean)
const getOption = (): echarts.EChartsOption => {
    return {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 28, 68, 0.88)',
            borderColor: '#1edcff',
            borderWidth: 1,
            confine: true,
            textStyle: {
                color: '#d9f7ff'
            },
            extraCssText: 'box-shadow: 0 0 12px rgba(30, 220, 255, 0.65);',
            formatter(params: any) {
                if (params.seriesType === 'lines') {
                    return `${params.data.fromName} → ${params.data.toName}<br/>客流量：${params.data.value}`
                }

                if (params.seriesType === 'effectScatter') {
                    return `${params.name}<br/>客流量：${params.value?.[2] || 0}`
                }

                if (params.seriesType === 'map') {
                    return `${params.name}<br/>客流量：${params.value || 0}`
                }

                return params.name
            }
        },
        geo: [
            {
                map: 'china',
                layoutCenter: ['52%', '56%'],
                layoutSize: '82%',

                // 关闭拖动/缩放
                roam: false,

                // 允许响应鼠标
                silent: false,

                zoom: 1.25,
                z: 1,

                itemStyle: {
                    areaColor: '#052a62',
                    borderColor: '#10d6ff',
                    borderWidth: 1.2,
                    shadowColor: 'rgba(0, 190, 255, 0.65)',
                    shadowBlur: 18
                },

                emphasis: {
                    disabled: false,
                    label: {
                        show: true,
                        color: '#ffffff',
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        areaColor: '#0a73c9',
                        borderColor: '#70f5ff',
                        borderWidth: 2,
                        shadowColor: '#29fcff',
                        shadowBlur: 25
                    }
                }
            }
        ],
        series: [
            {
                name: '中国地图',
                type: 'map',
                map: 'china',
                geoIndex: 0,
                zlevel: 2,
                selectedMode: false,
                silent: false,

                tooltip: {
                    show: true,
                    formatter(params: any) {
                        return `
        <div>
          <div style="font-size: 15px; color: #29fcff; margin-bottom: 4px;">
            ${params.name}
          </div>
          <div>客流量：${params.value || 0}</div>
        </div>
      `
                    }
                },

                label: {
                    show: false
                },

                itemStyle: {
                    areaColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#074f9d' },
                            { offset: 1, color: '#042653' }
                        ]
                    },
                    borderColor: '#1be7ff',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 220, 255, 0.65)',
                    shadowBlur: 12
                },

                emphasis: {
                    disabled: false,

                    label: {
                        show: true,
                        color: '#ffffff',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textShadowColor: '#00eaff',
                        textShadowBlur: 10
                    },

                    itemStyle: {
                        areaColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#19f7ff' },
                                { offset: 1, color: '#0578d8' }
                            ]
                        },
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        shadowColor: '#29fcff',
                        shadowBlur: 28
                    }
                },

                blur: {
                    itemStyle: {
                        opacity: 0.55
                    },
                    label: {
                        opacity: 0.5
                    }
                },

                data: Object.keys(geoCoordMap).map(name => ({
                    name,
                    value: Math.round(Math.random() * 100)
                }))
            },
            {
                name: '流入北京',
                type: 'lines',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 6,

                // 不要起点终点箭头
                symbol: ['none', 'none'],

                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.02,
                    symbol: planePath,
                    symbolSize: [24, 24],
                    color: '#ffd35a'
                },

                lineStyle: {
                    color: '#ff5d5d',
                    width: 1.2,
                    opacity: 0.75,
                    curveness: 0.25
                },

                data: convertLineData(flightToBeijing) as any
            },
            {
                name: '北京流出',
                type: 'lines',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 6,

                symbol: ['none', 'none'],

                effect: {
                    show: true,
                    period: 5,
                    trailLength: 0.02,
                    symbol: planePath,
                    symbolSize: [22, 22],
                    color: '#7df7ff'
                },

                lineStyle: {
                    color: '#8cecff',
                    width: 1,
                    opacity: 0.65,
                    curveness: -0.22
                },

                data: convertLineData(flightFromBeijing, true) as any
            },
            {
                name: '城市点位',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 4,
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 3.5
                },
                symbolSize(value: any) {
                    return Math.max(6, Math.min(value[2] / 8, 15))
                },
                itemStyle: {
                    color: '#ffdd5a',
                    shadowBlur: 12,
                    shadowColor: '#ffdd5a'
                },
                label: {
                    show: false
                },
                data: [
                    ...flightToBeijing,
                    ...flightFromBeijing,
                    { name: centerCity, value: 100 }
                ]
                    .map(item => {
                        const coord = geoCoordMap[item.name]
                        return coord
                            ? {
                                name: item.name,
                                value: [...coord, item.value]
                            }
                            : null
                    })
                    .filter(Boolean) as any
            },
            {
                name: '省份名称',
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 10,
                silent: true,

                symbolSize: 1,

                itemStyle: {
                    color: 'rgba(0, 0, 0, 0)'
                },

                label: {
                    show: true,
                    formatter: (params: any) => params.name,
                    position: 'inside',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 500,
                },

                labelLayout: {
                    hideOverlap: false
                },

                data: provinceLabelData as any
            }
        ],
        graphic: [
            {
                type: 'text',
                right: '16.7%',
                bottom: '24%',
                z: 100,
                style: {
                    text: '南海诸岛',
                    fill: '#ffffff',
                    fontSize: 15,
                    fontWeight: 500,
                }
            }
        ],
    }
}

const initChart = () => {
    if (!mapRef.value) return

    chart = echarts.init(mapRef.value)
    chart.setOption(getOption())

    window.addEventListener('resize', resizeChart)
}

const resizeChart = () => {
    chart?.resize()
}

onMounted(() => {
    initChart()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    chart?.dispose()
    chart = null
})
</script>

<style scoped lang="scss">
.map-box {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 620px;
    overflow: hidden;
}

.map {
    position: absolute;
    inset: 0;
    z-index: 2;
    margin-top: 20px;
}

/* 顶部平台高峰预警信息 */
.warn-bar {
    position: absolute;
    margin-top: 15px;
    left: 50%;
    z-index: 5;
    width: 360px;
    height: 42px;
    transform: translateX(-50%);
    background: url('../../../images/dataScreen-header-warn-bg.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    text-shadow: 0 0 8px rgba(0, 238, 255, 0.9);

    i {
        width: 18px;
        height: 8px;
        background: linear-gradient(90deg, #ffe15a, #ff9d00);
        transform: skewX(35deg);
        box-shadow: 0 0 8px rgba(255, 189, 28, 0.9);
        animation: warnFlash 1.2s infinite alternate;
    }

    i:nth-child(3) {
        animation-delay: 0.15s;
    }

    i:nth-child(4) {
        animation-delay: 0.3s;
    }
}

/* 左侧景区实时客流量标题 */
.map-title {
    margin-top: 30px;
    position: absolute;
    top: 50px;
    left: 52px;
    z-index: 5;
    width: 250px;
    height: 38px;
    line-height: 38px;
    padding-left: 48px;
    box-sizing: border-box;
    background: url('../../../images/map-title-bg.png') no-repeat center;
    background-size: 100% 100%;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 3px;
    text-shadow: 0 0 8px rgba(0, 210, 255, 0.95);
}

@keyframes warnFlash {
    from {
        opacity: 0.45;
    }

    to {
        opacity: 1;
    }
}
</style>