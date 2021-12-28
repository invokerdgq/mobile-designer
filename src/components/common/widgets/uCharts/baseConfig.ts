/*
* uCharts 中公用的基本配置
* */

const baseProps = {
  props: {
    type: 'line',
    loadingType: 1,
    errorShow: false,
    echartsH5: false,
    echartsApp: false,
    inScrollView: false,
    disabledScroll: false,
    background: 'rgba(255,255,255,1)',
    animation: true,
    timing: 'easeOut',
    duration: 1000,
    // color: [],
    padding: [10, 10, 10, 10],
    rotate: false,
    errorReload: true,
    fontSize: 13,
    fontColor: 'rgba(244,122,122,1)',
    enableScroll: false,
    touchMoveLimit: 60,
    enableMarkLine: false,
    dataLabel: true,
    dataPointShape: true,
    dataPointShapeType: 'solid',
    tooltipShow: true,
    // tooltipCustom: false,
    tapLegend: true
  },
  propsDec: {
    type: {
      label: '图标类型',
      component: 'el-input',
      options: {
        disabled: true
      }
    },
    loadingType: {
      label: '加载动画样式',
      component: 'el-input-number',
      options: {
        min: 0,
        max: 5
      }
    },
    errorShow: {
      label: '显示错误图标',
      component: 'el-switch'
    },
    echartsH5: {
      label: 'h5采用echarts引擎',
      component: 'el-switch'
    },
    echartsApp: {
      label: 'app采用echarts引擎',
      component: 'el-switch'
    },
    inScrollView: {
      label: '图标是否在scroll-view中',
      component: 'el-switch'
    },
    disabledScroll: {
      label: '禁止页面滑动',
      component: 'el-switch'
    },
    background: {
      label: '背景颜色',
      component: 'el-color-picker',
      options: {
        showAlpha: true
      }
    },
    animation: {
      label: '是否动画展示',
      component: 'el-switch'
    },
    timing: {
      label: '图表动画效果',
      component: 'el-select',
      options: {
        data: []
      }
    },
    duration: {
      label: '动画展示时长',
      component: 'el-input-number',
      options: {
        min: 0
      }
    },
    // color: {
    //   label: '主题色',
    //   component: ''
    // },
    padding: {
      label: '画布填充边距',
      component: ''
    },
    rotate: {
      label: '横屏模式',
      component: 'el-switch'
    },
    errorReload: {
      label: '点击错误图标重新加载',
      component: 'el-switch'
    },
    fontSize: {
      label: '全局默认字体大小',
      component: 'el-input-number',
      options: {
        min: 12
      }
    },
    fontColor: {
      label: '全局默认字体颜色',
      component: 'el-color-picker',
      options: {
        showAlpha: true
      }
    },
    enableScroll: {
      label: '图表可拖拽滚动',
      component: 'el-switch'
    },
    touchMoveLimit: {
      label: '图表拖拽时，每秒重新渲染的帧数',
      component: 'el-input-number'
    },
    enableMarkLine: {
      label: '启用标记线功能',
      component: 'el-switch'
    },
    dataLabel: {
      label: '显示图表区域内数据点上方的数据文案',
      component: 'el-switch'
    },
    dataPointShape: {
      label: '显示数据点的图形标识',
      component: 'el-switch'
    },
    dataPointShapeType: {
      label: '图形标识点显示类型',
      component: 'el-select',
      options: {
        data: []
      }
    },
    tooltipShow: {
      label: '通过组件方法显示tooltip提示窗',
      component: 'el-switch'
    },
    // tooltipCustom: {
    //   label: '自定义Tooltip显示内容',
    //   component: 'el-switch'
    // },
    tapLegend: {
      label: '开启图例点击交互事件',
      component: 'el-switch'
    }
  }
}

function getBase (type: string) {
  const config = JSON.parse(JSON.stringify(baseProps))
  config.props.type = type
  return config
}

export default getBase
