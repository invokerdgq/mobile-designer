import { completeCom } from '@/components/common/widgets/helper'

const uDropdownItem: any = {
  name: 'u-dropdown-item',
  label: '下拉菜单选项',
  stopPropagation: true,
  config: {
    props: {
      value: '',
      title: '标题',
      disabled: false,
      height: 'auto',
      options: []
    },
    propsS: {
      options: {
        type: 'arrayObject',
        key: {
          label: '',
          value: ''
        }
      }
    },
    propsDec: {
      value: {
        label: '绑定值',
        component: 'el-input',
        options: {
          disabled: true
        }
      },
      title: {
        label: '菜单项标题',
        component: 'el-input'
      },
      disabled: {
        label: '禁用菜单项',
        component: 'el-switch'
      },
      height: {
        label: '下拉内容高度',
        component: 'el-input'
      },
      options: {
        label: '选项数据',
        component: 'arrayObject',
        options: {
          keyDec: {
            label: '名称',
            value: '标志'
          }
        }
      }
    },
    class: {},
    on: {
      change: []
    },
    onDec: {
      change: {
        label: '点击某个option选项时触发',
        params: {
          value: '菜单项绑定值'
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
      needContainer: true
    }
  }
}

completeCom(uDropdownItem)

export default uDropdownItem
