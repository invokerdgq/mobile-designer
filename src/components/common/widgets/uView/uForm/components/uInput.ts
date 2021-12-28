import { options } from '@/utils/editor/options/selectOptions'
import { completeCom } from '@/components/common/widgets/helper'

const uInput: any = {
  name: 'u-input',
  label: '输入框',
  config: {
    props: {
      type: 'text',
      clearable: true,
      inputAlign: 'left',
      placeholder: '请输入内容',
      maxLength: 140,
      height: 35
    },
    propsDec: {
      type: {
        label: '输入框模式',
        component: 'el-select',
        options: {
          data: JSON.parse(JSON.stringify(options.inputType))
        }
      },
      clearable: {
        label: '可清除',
        component: 'el-switch'
      },
      inputAlign: {
        label: '输入框文字对齐',
        component: 'el-select',
        options: {
          data: JSON.parse(JSON.stringify(options.inputAlign))
        }
      },
      placeholder: {
        label: '提示文字',
        component: 'el-input'
      },
      maxLength: {
        label: '最大输入长度',
        component: 'el-input-number'
      },
      height: {
        label: '输入框高度',
        component: 'el-input-number'
      }
    },
    class: {},
    on: {},
    onDec: {},
    nativeOn: {},
    nativeOnDec: {}
  }
}

completeCom(uInput, {
  width: 250,
  height: 35
})

export default uInput
