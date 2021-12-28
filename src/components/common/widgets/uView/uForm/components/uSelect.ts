import { completeCom } from '@/components/common/widgets/helper'
import { options } from '@/utils/editor/options/selectOptions'

const uSelect: any = {
    name: 'u-select',
    label: '列选择器',
    isPopup: true,
    needRm: true,
    config: {
        props: {
            value: true,
            mode: 'single-column',
            list: []
        },
        propsS: {
            list: {
                type: 'arrayObject',
                key: {
                    label: '',
                    value: ''
                }
            }
        },
        propsDec: {
            value: {
                label: '是否弹出',
                component: 'el-switch',
                options: {
                    disabled: true
                }
            },
            mode: {
                label: '选择器模式',
                component: 'el-select',
                options: {
                    data: JSON.parse(JSON.stringify(options.selectMode))
                },
                init: {
                    target: 'list',
                    use: {
                        'single-column': {
                            type: 'arrayObject',
                            key: {
                                label: '',
                                value: ''
                            }
                        },
                        'mutil-column': {
                            type: 'arrayMulti',
                            key: [
                                {
                                    label: '',
                                    value: ''
                                }
                            ]
                        },
                        'mutil-column-auto': {
                            type: 'arrayTree',
                            key: {
                                label: '',
                                value: '',
                                PARENT_ID: ''
                            }
                        }
                    }
                }
            },
            list: {
                label: '列数据',
                component: {
                    key: 'mode',
                    use: {
                        'single-column': 'arrayObject',
                        'mutil-column': 'arrayMulti',
                        'mutil-column-auto': 'arrayTree'
                    }
                },
                options: {
                    keyDec: {
                       'single-column': {
                           label: '名称',
                           value: '标志'
                       },
                        'mutil-column': {
                            label: '名称',
                            value: '标志'
                        },
                        'mutil-column-auto': {
                           label: '名称',
                            value: '标志',
                            PARENT_ID: '父Id'
                        }
                    },
                }
            }
        },
        class: {},
        on: {},
        onDec: {},
        nativeOn: {},
        nativeOnDec: {}
    }
}

completeCom(uSelect)

export default uSelect
