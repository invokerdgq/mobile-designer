import { getStyle, resolveBindData } from '@/components/common/widgets/helper'
import DataSet from '@/components/common/widgets/dataset'
import { uniUiOptions } from '@/utils/editor/options/selectOptions'

const uniListItem: any = {
  name: 'uni-list-item',
  label: '列表项',
  config: {
    props: {
      title: '标题',
      note: '描述',
      ellipsis: 0,
      thumb: '',
      thumbSize: 'medium',
      showBadge: false,
      badgeText: '99',
      // badgeType: '',
      rightText: '',
      disabled: false,
      showArrow: true,
      clickable: false,
      direction: 'row'
    },
    propsDec: {
      title: {
        label: '标题',
        component: 'el-input'
      },
      note: {
        label: '描述',
        component: 'el-input'
      },
      ellipsis: {
        label: '标题溢出',
        component: 'el-select',
        data: JSON.parse(JSON.stringify(uniUiOptions.ellipsis))
      },
      thumb: {
        label: '左侧缩略图',
        component: 'el-input'
      },
      thumbSize: {
        label: '缩略图大小',
        component: 'el-select',
        data: JSON.parse(JSON.stringify(uniUiOptions.thumbSize))
      },
      showBadge: {
        label: '显示角标',
        component: 'el-switch'
      },
      badgeText: {
        label: '交表内容',
        component: 'el-input'
      },
      rightText: {
        label: '右侧文字',
        component: 'el-input'
      },
      disabled: {
        label: '是否禁用',
        component: 'el-switch'
      },
      showArrow: {
        label: '右侧箭头',
        component: 'el-switch'
      },
      clickable: {
        label: '开启点击反馈',
        component: 'el-switch'
      },
      direction: {
        label: '排列方向',
        component: 'el-select',
        data: JSON.parse(JSON.stringify(uniUiOptions.direction))
      }
    },
    class: {},
    on: {},
    onDec: {},
    nativeOn: {},
    nativeOnDec: {}
  },
  child: {
    header: null,
    body: [],
    footer: null
  },
  childDec: {
    header: {
      label: '左侧'
    },
    body: {
      label: '内容',
      multi: true
    },
    footer: {
      label: '右侧'
    },
    default: {
      alias: 'body'
    }
  }
}

getStyle(uniListItem, {
  height: 50
})

resolveBindData(uniListItem)

uniListItem.dataset = JSON.parse(JSON.stringify(DataSet))

export default uniListItem
