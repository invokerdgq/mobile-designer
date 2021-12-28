import { completeCom } from '@/components/common/widgets/helper'

const Map: any = {
    name: 'map',
    label: '地图',
    config: {
        props: {
            longitude: 120.214214,
            latitude: 30.2800,
            scale: 16,
            minScale: 3,
            maxScale: 20,
            showCompass: false,
            enableZoom: true,
            enableScroll: true,
            enableRotate: true,
            enableOverlooking: false,
            enableSatellite: false,
            // enableTraffic: false,
            enablePoi: false,
            enableBuilding: false
        },
        propsDec: {
            longitude: {
                label: '中心经度',
                component: 'el-input-number',
                options: {
                    step: 0.0001
                }
            },
            latitude: {
                label: '中心纬度',
                component: 'el-input-number',
                options: {
                    step: 0.0001
                }
            },
            scale: {
                label: '缩放级别',
                component: 'el-input-number',
                options: {
                    min: 0,
                    step: 1
                }
            },
            minScale: {
                label: '最小缩放级别',
                component: 'el-input-number',
                options: {
                    step: 1,
                    min: 0
                }
            },
            maxScale: {
                label: '最大缩放级别',
                component: 'el-input-number',
                options: {
                    step: 1,
                    min: 0
                }
            },
            showCompass: {
                label: '是否显示指南针',
                component: 'el-switch'
            },
            enableZoom: {
                label: '是否支持缩放',
                component: 'el-switch'
            },
            enableScroll: {
                label: '是否支持拖动',
                component: 'el-switch'
            },
            enableRotate: {
                label: '是否支持旋转',
                component: 'el-switch'
            },
            enableOverlooking: {
                label: '是否开启俯视图',
                component: 'el-switch'
            },
            enableSatellite: {
                label: '是否开启卫星图',
                component: 'el-switch'
            },
            enableBuilding: {
                label: '是否展示建筑物',
                component: 'el-switch'
            },
            enablePoi: {
                label: '是否展示poi点',
                component: 'el-switch'
            }
        },
        class: {},
        on: {},
        onDec: {},
        nativeOn: {},
        nativeOnDec: {}
    }
}

completeCom(Map, {
    width: 400,
    height: 400
})

export default Map
