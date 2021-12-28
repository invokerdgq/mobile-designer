import { completeCom } from '@/components/common/widgets/helper'

const uModal: any = {
  name: 'u-modal',
  label: '模态框',
  isPopup: true,
  extraStyle: [],
  config: {
    props: {
      value: true,
      zIndex: 1075,
      title: '提示',
      width: 300,
      content: '',
      showTitle: true,
      showConfirmButton: true,
      showCancelButton: false,
      confirmText: '确认',
      cancelText: '取消',
      cancelColor: 'rgba(96,98,102,1)',
      confirmColor: 'rgba(41, 121, 255, 1)',
      borderRadius: 8,
      zoom: true,
      asyncClose: false,
      maskCloseAble: false
    },
    propsDec: {
      value: {
        label: '是否显示',
        component: 'el-switch',
        options: {
          disabled: true
        }
      },
      zIndex: {
        label: '层级',
        component: 'el-input-number'
      },
      title: {
        label: '标题',
        component: 'el-input'
      },
      width: {
        label: '模态框宽度',
        component: 'el-input-number'
      },
      content: {
        label: '内容',
        component: 'el-input',
        options: {
          type: 'textarea'
        }
      },
      showTitle: {
        label: '显示标题',
        component: 'el-switch'
      },
      showConfirmButton: {
        label: '显示确认按钮',
        component: 'el-switch'
      },
      showCancelButton: {
        label: '显示取消按钮',
        component: 'el-switch'
      },
      confirmText: {
        label: '确认文字',
        component: 'el-input'
      },
      cancelText: {
        label: '取消文字',
        component: 'el-input'
      },
      confirmColor: {
        label: '确认按钮颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      cancelColor: {
        label: '取消按钮颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      borderRadius: {
        label: '圆角大小',
        component: 'el-input-number'
      },
      zoom: {
        label: '开启缩放模式',
        component: 'el-switch'
      },
      asyncClose: {
        label: '异步关闭'
      },
      maskCloseAble: {
        label: '点击遮罩层关闭',
        component: 'el-switch'
      }
    },
    class: {},
    on: {
      confirm: [],
      cancel: []
    },
    onDec: {
      confirm: {
        label: '点击确认按钮时',
        params: {}
      },
      cancel: {
        label: '点击取消按钮时',
        params: {}
      }
    },
    nativeOn: {
      click: []
    },
    nativeOnDec: {
      click: {
        label: '点击'
      }
    }
  },
  child: {
    default: [],
    'confirm-button': null
  },
  childDec: {
    default: {
      label: '默认插槽',
      needContainer: true
    },
    'confirm-button': {
      label: '确认按钮插槽'
    }
  }
}

completeCom(uModal)

export default uModal
