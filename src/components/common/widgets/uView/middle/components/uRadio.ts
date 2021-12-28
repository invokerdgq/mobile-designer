import { completeCom } from '@/components/common/widgets/helper'

const uRadio: any = {
  name: 'u-radio',
  label: '单选radio',
  isMiddle: true,
  config: {
    props: {
      disabled: false,
      labelDisabled: false,
      iconSize: 20,
      activeColor: 'rgba(41,121,255,1)',
      name: '1'
    },
    propsDec: {
      disabled: {
        label: '禁用所有',
        component: 'el-switch'
      },
      labelDisabled: {
        label: '禁用点击文本操作',
        component: 'el-switch'
      },
      iconSize: {
        label: '图标大小',
        component: 'el-input-number'
      },
      activeColor: {
        label: '选中时的颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      name: {
        label: '选项标志',
        component: 'el-input'
      }
    },
    class: {},
    on: {
      change: []
    },
    onDec: {
      change: {
        label: '某个radio 发生变化'
      }
    },
    nativeOn: {},
    nativeOnDec: {}
  },
  child: {
    default: []
  },
  childDec: {
    default: {
      label: '默认插槽',
      position: 'absolute',
      needContainer: true
    }
  }
}

completeCom(uRadio, {
  width: 60,
  height: 40
})

export default uRadio
