import { completeCom } from '@/components/common/widgets/helper'

const uButton: any = {
  name: 'u-button',
  label: '按钮',
  stopPropagation: true,
  config: {
    props: {
      type: 'primary',
      plain: false,
      ripple: false,
      disabled: false,
      shape: 'square'
    },
    propsDec: {
      type: {
        label: '按钮类型',
        component: 'el-select',
        options: {
          data: [
            {
              label: '主要',
              value: 'primary'
            },
            {
              label: '成功',
              value: 'success'
            },
            {
              label: '警告',
              value: 'warning'
            },
            {
              label: '错误',
              value: 'error'
            },
            {
              label: '信息',
              value: 'info'
            }
          ]
        }
      },
      plain: {
        label: '朴素按钮',
        component: 'el-switch'
      },
      disabled: {
        label: '禁用',
        component: 'el-switch'
      },
      ripple: {
        label: '点击水波纹效果',
        component: 'el-switch'
      },
      shape: {
        label: '形状',
        component: 'el-select',
        options: {
          data: [
            {
              label: '直角',
              value: 'square'
            },
            {
              label: '圆角',
              value: 'circle'
            }
          ]
        }
      }
    },
    nativeOn: {
      click: []
    },
    nativeOnDec: {
      click: {
        label: '按钮被点击'
      }
    },
    on: {
      click: []
    },
    onDec: {
      click: {
        label: '按钮被点击'
      }
    },
    class: {}
  },
  child: {
    default: []
  },
  childDec: {
    default: {
      label: '默认插槽',
      position: 'relative'
    }
  }
}

completeCom(uButton, {
  width: 80,
  height: 40
})

export default uButton
