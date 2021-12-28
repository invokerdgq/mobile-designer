import { options } from '@/utils/editor/options/selectOptions'
import { completeCom } from '@/components/common/widgets/helper'

const uRadioGroup: any = {
  name: 'u-radio-group',
  label: '单选框组',
  config: {
    props: {
      value: '',
      disabled: false,
      labelDisabled: false,
      shape: 'circle',
      iconSize: 10,
      activeColor: 'rgba(41,121,255,1)',
      size: 17,
      width: 'auto',
      wrap: false
    },
    propsDec: {
      value: {
        label: '绑定值',
        component: 'el-input'
      },
      disabled: {
        label: '禁用所有',
        component: 'el-switch'
      },
      labelDisabled: {
        label: '禁用点击文本操作',
        component: 'el-switch'
      },
      shape: {
        label: '形状',
        component: 'el-select',
        options: {
          data: JSON.parse(JSON.stringify(options.radioShape))
        }
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
      size: {
        label: 'radio 整体大小',
        component: 'el-input-number'
      },
      width: {
        label: 'radio宽度',
        component: 'el-input'
      },
      wrap: {
        label: '每个radio 独占一行',
        component: 'el-switch'
      }
    },
    class: {},
    on: {
      change: []
    },
    onDec: {
      change: {
        label: '任一个radio 发生变化时',
        params: {
          name: ''
        }
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
      hasListMode: true,
      listMode: false,
      prefixCom: 'uRadio',
      position: 'relative'
    }
  }
}

completeCom(uRadioGroup, {
  width: 260,
  height: 40
})

export default uRadioGroup
