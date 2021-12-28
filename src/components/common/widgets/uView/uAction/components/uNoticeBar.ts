import { options } from '@/utils/editor/options/selectOptions'
import { completeCom } from '@/components/common/widgets/helper'

const uNoticeBar: any = {
    name: 'u-notice-bar',
    label: '滚动通知',
    config: {
        props: {
            list: [],
            type: 'warning',
            volumeIcon: true,
            moreIcon: true,
            closeIcon: false,
            autoplay: true,
            color: '',
            bgColor: '',
            mode: 'horizontal',
            show: true,
            volumeSize: 34,
            fontSize: 28,
            duration: 2000,
            speed: 160,
            isCircular: true,
            playState: 'play',
            disableTouch: true,
            borderRadius: 0,
            noListHidden: true
        },
        propsDec: {
            list: {
                label: '滚动数据',
                component: 'arraySimple'
            },
            type: {
                label: '显示的主题',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.noticeBarType))
                }
            },
            volumeIcon: {
                label: '显示小喇叭图标',
                component: 'el-switch'
            },
            moreIcon: {
                label: '右侧箭头图标',
                component: 'el-select'
            },
            closeIcon: {
                label: '显示关闭图标',
                component: 'el-select'
            },
            autoplay: {
                label: '自动播放',
                component: 'el-switch'
            },
            color: {
                label: '文字颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            bgColor: {
                label: '背景颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            mode: {
                label: '滚动模式',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.noticeBarMode))
                }
            },
            show: {
                label: '是否显示',
                component: 'el-switch'
            },
            volumeSize: {
                label: '喇叭大小',
                component: 'el-input-number'
            },
            fontSize: {
                label: '字体大小',
                component: 'el-input-number'
            },
            duration: {
                label: '滚动周期时长',
                component: 'el-input-number',
                options: {
                    step: 100
                }
            },
            speed: {
                label: '水平滚动速度',
                component: 'el-input-number'
            },
            isCircular: {
                label: '是否衔接滚动',
                component: 'el-switch'
            },
            playState: {
                label: '播放状态',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.noticeBarState))
                }
            },
            disableTouch: {
                label: '禁止手滑动切换',
                component: 'el-switch'
            },
            borderRadius: {
                label: '圆角',
                component: 'el-input-number'
            },
            noListHidden: {
                label: '无数据时不显示',
                component: 'el-switch'
            }
        },
        propsS: {
            list: {
                type: 'array-simple',
                key: ''
            }
        },
        class: {},
        on: {},
        onDec: {},
        nativeOn: {},
        nativeOnDec: {}
    },
    extraStyle: {}
}

completeCom(uNoticeBar, {
    width: 300,
    height: 40
})

export default uNoticeBar
