import { completeCom } from '@/components/common/widgets/helper'

const uCollapse: any = {
  name: 'u-collapse',
  label: '折叠面板',
  config: {
    props: {
      accordion: true,
      arrow: true,
      arrowColor: 'rgba(144,157,143,1)'
    },
    propsDec: {
      accordion: {
        label: '手风琴模式',
        component: 'el-switch'
      },
      arrow: {
        label: '右侧箭头',
        component: 'el-switch'
      },
      arrowColor: {
        label: '右侧箭头颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true
        }
      }
    },
    class: {},
    on: {
      change: []
    },
    onDec: {
      change: {
        label: '激活面板展开时',
        params: { activeNames: '' }
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
  data: {},
  child: {
    default: []
  },
  childDec: {
    default: {
      label: '默认插槽',
      hasListMode: true,
      listMode: false,
      prefixCom: 'uCollapseItem',
      position: 'relative'
    }
  }
}

completeCom(uCollapse, {
  width: 300,
  height: 400
})

export default uCollapse
