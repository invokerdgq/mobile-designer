import { completeCom } from '@/components/common/widgets/helper'
import { options } from '@/utils/editor/options/selectOptions'

const uTag = {
    name: 'u-tag',
    label: '标签',
    config: {
        props: {
            show: true,
            type: 'primary',
            size: 'default',
            shape: 'square',
            text: '蒹葭苍苍',
            bgColor: 'rgba(255,255,255,1)',
            color: '',
            borderColor: '',
            closeColor: '',
            index: '',
            mode: 'light',
            closeable: false
        },
        propsDec: {
            show: {
                label: '是否显示标签',
                component: 'el-switch',
                options: {
                    disabled: true
                }
            },
            type: {
                label: '主题类型',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.tagType))
                }
            },
            size: {
                label: '标签大小',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.tagSize))
                }
            },
            shape: {
                label: '标签形状',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.tagShape))
                }
            },
            text: {
                label: '标签文字内容',
                component: 'el-input'
            },
            bgColor: {
                label: '背景颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            color: {
                label: '文字颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            borderColor: {
                label: '边框颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            closeColor: {
                label: '关闭按钮颜色',
                component: 'el-color-picker',
                options: {
                    showAlpha: true
                }
            },
            index: {
                label: '点击事件附带参数值',
                component: 'el-input'
            },
            mode: {
                label: '模式',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.tagMode))
                }
            },
            closeable: {
                label: '是否可关闭',
                component: 'el-switch'
            }
        },
        class: {},
        on: {
            click: [],
            close: []
        },
        onDec: {
            click: {
                label: '点击标签触发',
                params: {
                    index: '传递的index 参数值'
                }
            }
        },
        nativeOn: {},
        nativeOnDec: {}
    },
    extraStyle: {},
}

completeCom(uTag)

export default uTag
