import { getStyle, resolveBindData } from '@/components/common/widgets/helper'
import DataSet from '@/components/common/widgets/dataset'

const uniList: any = {
  name: 'uni-list',
  label: '列表组件',
  config: {
    props: {
      border: true
    },
    propsDec: {
      border: {
        label: '是否开启边框',
        component: 'el-switch'
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
      prefixCom: 'uniListItem',
      position: 'relative'
    }
  }
}

getStyle(uniList, {
  width: 360,
  height: 200
})

resolveBindData(uniList)

uniList.dataset = JSON.parse(JSON.stringify(DataSet))

export default uniList
