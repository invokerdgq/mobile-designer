import { options } from '@/utils/editor/options/selectOptions'
import { completeCom } from '@/components/common/widgets/helper'

const uPopup: any = {
  name: 'u-popup',
  label: '弹出层',
  isPopup: true,
  config: {
    props: {
      value: true,
      mode: 'left',
      mask: true,
      length: 200,
      zoom: true,
      safeAreaInsetBottom: false,
      maskCloseAble: true,
      borderRadius: 0,
      zIndex: 10075,
      closeable: true,
      closeIcon: 'close',
      closeIconPos: 'top-right',
      closeIconColor: 'rgba(144,147,153,1)',
      closeIconSize: 15,
      width: 200,
      height: 400,
      duration: 250
    },
    propsDec: {
      value: {
        label: '是否显示',
        component: 'el-switch',
        options: {
          disabled: true
        }
      },
      mode: {
        label: '弹出方向',
        component: 'el-select',
        options: {
          data: JSON.parse(JSON.stringify(options.popupMode))
        }
      },
      mask: {
        label: '显示遮罩层',
        component: 'el-switch'
      },
      length: {
        label: '弹出层尺寸',
        component: 'el-input'
      },
      zoom: {
        label: '开启缩放动画',
        component: 'el-switch'
      },
      safeAreaInsetBottom: {
        label: '底部安全区适配',
        component: 'el-switch'
      },
      maskCloseAble: {
        label: '点击遮罩关闭',
        component: 'el-switch'
      },
      borderRadius: {
        label: '弹框圆角值',
        component: 'el-input-number'
      },
      zIndex: {
        label: '层级值',
        component: 'el-input-number'
      },
      closeable: {
        label: '显示关闭图标',
        component: 'el-switch'
      },
      closeIcon: {
        label: '关闭按钮图标',
        component: 'el-input'
      },
      closeIconPos: {
        label: '关闭按钮位置',
        component: 'el-select',
        options: {
          data: JSON.parse(JSON.stringify(options.closeIconPos))
        }
      },
      closeIconColor: {
        label: '关闭按钮颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      closeIconSize: {
        label: '关闭按钮大小',
        component: 'el-input-number'
      },
      width: {
        label: '宽度',
        component: 'el-input-number'
      },
      height: {
        label: '高度',
        component: 'el-input-number'
      },
      duration: {
        label: '过度动画时间',
        component: 'el-input-number'
      }
    },
    class: {},
    on: {
      open: [],
      close: []
    },
    onDec: {
      open: {
        label: '弹出层打开时'
      },
      close: {
        label: '弹出层收起时'
      }
    },
    nativeOn: {
      click: []
    },
    nativeOnDec: {
      click: {
        label: '元素点击'
      }
    }
  },
  child: {
    default: []
  },
  childDec: {
    default: {
      label: '默认插槽'
    }
  }
}

completeCom(uPopup)

export default uPopup
