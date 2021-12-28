import { completeCom } from '@/components/common/widgets/helper'

const uCollapseItem: any = {
  name: 'u-collapse-item',
  label: '折叠面板项',
  isMiddle: true,
  needRm: true,
  config: {
    props: {
      title: '面板标题',
      disabled: false,
      open: false,
      name: ''
    },
    propsDec: {
      title: {
        label: '面板标题',
        component: 'el-input'
      },
      disabled: {
        label: '是否禁用',
        component: 'el-switch'
      },
      open: {
        label: '初始状态',
        component: 'el-switch'
      },
      name: {
        label: '唯一标识',
        component: 'el-input'
      }
    },
    class: {},
    on: {
      change: []
    },
    onDec: {
      change: {
        label: 'item 被打开或收起时'
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
    title: null,
    'title-all': null
  },
  childDec: {
    default: {
      label: '默认插槽',
      needContainer: true
    },
    title: {
      label: '标题（不含右侧箭头）'
    },
    'title-all': {
      label: '标题整体'
    }
  }
}

completeCom(uCollapseItem)

export default uCollapseItem
