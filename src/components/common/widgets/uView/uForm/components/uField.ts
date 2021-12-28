import { completeCom } from '@/components/common/widgets/helper'

const uField: any = {
  name: 'u-field',
  label: 'field输入框',
  child: {
    icon: null,
    right: null
  },
  childDec: {
    icon: {
      label: '左侧插槽'
    },
    right: {
      label: '右侧插槽'
    }
  },
  config: {
    props: {
      type: 'text',
      icon: '',
      borderBottom: true,
      borderTop: false,
      rightIcon: '',
      required: false,
      label: '用户名 :',
      labelWidth: 130,
      password: false
    },
    propsDec: {
      type: {
        label: '输入框类型',
        component: 'el-select',
        options: {
          data: [
            {
              label: '文本',
              value: 'text'
            },
            {
              label: '文本域',
              value: 'textarea'
            }
          ]
        }
      },
      icon: {
        label: '左侧图标名称',
        component: 'el-input'
      },
      borderBottom: {
        label: '下边框',
        component: 'el-switch'
      },
      borderTop: {
        label: '上边框',
        component: 'el-switch'
      },
      rightIcon: {
        label: '右侧图标名称',
        component: 'el-input'
      },
      required: {
        label: '是否必填',
        component: 'el-switch'
      },
      label: {
        label: '左侧提示文字',
        component: 'el-input'
      },
      labelWidth: {
        label: '左侧文字宽度',
        component: 'el-input-number'
      },
      password: {
        label: '密码形式',
        component: 'el-switch'
      }
    },
    class: {},
    on: {
      input: [],
      focus: [],
      blur: [],
      confirm: [],
      'right-icon-click': [],
      click: []
    },
    onDec: {
      input: {
        label: '输入框内容变化时'
      },
      focus: {
        label: '输入框获得焦点时'
      },
      blur: {
        label: '输入框失去焦点时'
      },
      confirm: {
        label: '点击完成按钮时'
      },
      'right-icon-click': {
        label: '点击右侧按钮时'
      },
      click: {
        label: '输入框被点击时'
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
  }
}

completeCom(uField, {
  width: 300,
  height: 42
})

export default uField
