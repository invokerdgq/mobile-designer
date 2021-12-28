import { completeCom } from '@/components/common/widgets/helper'

const View: any = {
  name: 'view',
  label: '矩形容器',
  config: {
    props: {
      hoverClass: '',
      hoveStopPropagation: false,
      hoverStartTime: 50,
      hoverStayTime: 400
    },
    propsDec: {
      hoverClass: {
        label: '手指按下样式类',
        component: 'el-input'
      },
      hoveStopPropagation: {
        label: '阻止父元素出现点击态',
        component: 'el-switch'
      },
      hoverStartTime: {
        label: '按住多久出现点击态',
        component: 'el-input-number'
      },
      hoverStayTime: {
        label: '点击态持续',
        component: 'el-input-number'
      }
    },
    class: {},
    on: {},
    onDec: {},
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
      prefixCom: 'view',
      position: 'relative'
    }
  }
}

completeCom(View, {
  width: 330,
  height: 100
})

export default View
