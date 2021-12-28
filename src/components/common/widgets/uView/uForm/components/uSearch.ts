import { completeCom } from '@/components/common/widgets/helper'

const uSearch: any = {
  name: 'u-search',
  label: '搜索框',
  config: {
    props: {
      placeholder: '请输入',
      value: '',
      shape: 'round',
      bgColor: '#f2f2f2',
      borderColor: '',
      actionText: '搜索',
      height: 40
    },
    propsDec: {
      placeholder: {
        label: '提示语',
        component: 'el-input'
      },
      value: {
        label: '输入值',
        component: 'el-input'
      },
      shape: {
        label: '搜索框形状',
        component: 'el-select',
        options: {
          data: [
            {
              label: '圆形',
              value: 'round'
            },
            {
              label: '方形',
              value: 'square'
            }
          ]
        }
      },
      actionText: {
        label: '搜索框右侧文字',
        component: 'el-input'
      },
      bgColor: {
        label: '输入框背景颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      borderColor: {
        label: '输入框边框颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true,
          colorFormat: 'rgb'
        }
      },
      height: {
        label: '输入框高度',
        component: 'el-input',
        options: {
          type: 'number'
        }
      }
    },
    class: {},
    on: {
      search: []
    },
    onDec: {
      search: {
        label: '确认搜索时'
      }
    },
    nativeOn: {},
    nativeOnDec: {}
  },
  child: null
}

completeCom(uSearch, {
  width: 260,
  height: 50
})

export default uSearch
