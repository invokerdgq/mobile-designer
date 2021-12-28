import { completeCom } from '@/components/common/widgets/helper'

const uFormItem: any = {
  name: 'u-form-item',
  label: '表单项',
  isMiddle: true,
  config: {
    props: {
      label: '说明',
      prop: '',
      borderBottom: true,
      labelPosition: 'left',
      labelWidth: 130,
      leftIcon: '',
      rightIcon: '',
      required: false
    },
    propsDec: {
      label: {
        label: '左侧提示文字',
        component: 'el-input'
      },
      prop: {
        label: '校验字段名',
        component: 'el-input'
      },
      borderBottom: {
        label: '底部边框',
        component: 'el-switch'
      },
      labelPosition: {
        label: '提示文字位置',
        component: 'el-select',
        options: {
          data: [
            {
              label: '左侧',
              value: 'left'
            },
            {
              label: '上侧',
              value: 'top'
            }
          ]
        }
      },
      labelWidth: {
        label: '提示区域宽度',
        component: 'el-input-number'
      },
      rightIcon: {
        label: '右侧图标名称',
        component: 'el-input'
      },
      leftIcon: {
        label: '左侧图标名称',
        component: 'el-input'
      },
      required: {
        label: '必填',
        component: 'el-switch'
      }
    },
    class: {},
    on: {},
    onDec: {},
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
    right: null
  },
  childDec: {
    default: {
      label: '默认插槽',
      position: 'relative'
    },
    right: {
      label: '右侧插槽'
    }
  }
}

completeCom(uFormItem, {
  width: 335,
  height: 50
})

export default uFormItem
