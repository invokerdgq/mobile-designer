import { completeCom } from '@/components/common/widgets/helper'

const uDropdown: any = {
  name: 'u-dropdown',
  label: '下拉菜单',
  config: {
    props: {
      activeColor: 'rgba(41, 121, 255, 1)',
      inactiveColor: 'rgba(96, 98, 102, 1)',
      closeOnClickMask: true,
      closeOnClickSelf: true,
      duration: 300,
      height: 80,
      borderBottom: false,
      titleSize: 28,
      borderRadius: 0,
      menuIcon: 'arrow-down',
      menuIconSize: 26
    },
    propsDec: {
      activeColor: {
        label: '标题和选项卡选中颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true
        }
      },
      inactiveColor: {
        label: '标题和选项卡未选中颜色',
        component: 'el-color-picker',
        options: {
          showAlpha: true
        }
      },
      closeOnClickMask: {
        label: '点击遮罩关闭菜单',
        component: 'el-switch'
      },
      closeOnClickSelf: {
        label: '点击当前标签关闭菜单',
        component: 'el-switch'
      },
      duration: {
        label: '动画过度时间',
        component: 'el-input-number',
        options: {
          min: 0,
          step: 100
        }
      },
      height: {
        label: '标题菜单高度',
        component: 'el-input-number',
        options: {
          min: 0
        }
      },
      borderBottom: {
        label: '标题下边框',
        component: 'el-switch'
      },
      titleSize: {
        label: '标题字体大小',
        component: 'el-input-number',
        options: {
          min: 12
        }
      },
      borderRadius: {
        label: '菜单展开内容圆角',
        component: 'el-input-number'
      },
      menuIcon: {
        label: '标题右侧图标',
        component: 'el-input'
      },
      menuIconSize: {
        label: '图标大小',
        component: 'el-input-number'
      }
    },
    class: {},
    on: {
      open: [],
      close: []
    },
    onDec: {
      open: {
        label: '下拉菜单被打开时',
        params: {
          index: '当前被打开菜单的索引'
        }
      },
      close: {
        label: '下拉菜单被关闭时',
        params: {
          index: '当前被关闭菜单的索引'
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
      hasListMode: true,
      listMode: false,
      prefixCom: 'uDropdownItem',
      position: 'relative'
    }
  }
}

completeCom(uDropdown, {
  width: 450,
  height: 500
})

export default uDropdown
