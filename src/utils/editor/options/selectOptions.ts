const position = [
  {
    label: '绝对定位',
    value: 'absolute'
  },
  {
    label: '相对屏幕定位',
    value: 'fixed'
  },
  {
    label: '相对定位',
    value: 'relative'
  },
  {
    label: '静态',
    value: 'static'
  }
]

const borderStyle = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  },
  {
    label: '点状',
    value: 'dotted'
  }
]

const fontFamily = [
  // {
  //     value: 'Microsoft Yahei',
  //     label: '微软雅黑'
  // },
  {
    value: 'Tahoma',
    label: 'tahoma'
  },
  {
    value: 'Arial',
    label: 'arial'
  },
  {
    value: 'sans-serif',
    label: 'sans-serif'
  },
  {
    value: 'SimSun',
    label: '宋体'
  },
  {
    value: 'FangSong',
    label: '仿宋'
  },
  {
    value: 'SimHei',
    label: '黑体'
  },
  {
    value: 'LiSu',
    label: '隶书'
  },
  {
    value: 'YouYuan',
    label: '幼圆'
  },
  {
    value: 'define',
    label: '高端黑'
  },
  {
    value: 'times',
    label: '新罗马'
  },
  {
    value: 'pangmen',
    label: '庞门正道'
  },
  {
    value: 'SourceHanSerifCN-Regular',
    label: '思源宋体'
  },
  {
    value: 'SourceHanSansSC-Normal',
    label: '思源normal'
  },
  {
    value: 'SourceHanSansSC-Medium',
    label: '思源黑体-中等'
  },
  {
    value: 'SourceHanSansSC-Regular',
    label: '思源黑体-常规'
  },
  {
    value: 'alibabaPuHuiTiLight',
    label: '阿里普惠体-细体'
  },
  {
    value: 'alibabaPuHuiTiMedium',
    label: '阿里普惠体-中等'
  },
  {
    value: 'alibabaPuHuiTiRegular',
    label: '阿里普惠体-常规'
  },
  {
    value: 'unidreamLED',
    label: '液晶字体'
  },
  {
    value: 'HXB-font',
    label: '胡晓波字体'
  }
]

const fontStyle = [
  {
    value: 'normal',
    label: '默认风格'
  },
  {
    value: 'italic',
    label: '斜体'
  },
  {
    value: 'oblique',
    label: '倾斜'
  }
]

const horizontalAlignment = [
  {
    value: 'left',
    label: '居左'
  },
  {
    value: 'right',
    label: '居右'
  },
  {
    value: 'center',
    label: '居中'
  },
  {
    value: 'justify',
    label: '两端'
  }
]

const inputType = [
  {
    label: '文本',
    value: 'text'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '文本域',
    value: 'textarea'
  },
  {
    label: '密码',
    value: 'password'
  },
  {
    label: '选择',
    value: 'select'
  }
]

const inputAlign = [
  {
    value: 'left',
    label: '居左'
  },
  {
    value: 'right',
    label: '居右'
  },
  {
    value: 'center',
    label: '居中'
  }
]

const popupMode = [
  {
    value: 'top',
    label: '上方'
  },
  {
    value: 'right',
    label: '右方'
  },
  {
    value: 'bottom',
    label: '下方'
  },
  {
    value: 'left',
    label: '左方'
  }
]

const closeIconPos = [
  {
    value: 'top-right',
    label: '右上'
  },
  {
    value: 'bottom-right',
    label: '右下'
  },
  {
    value: 'top-left',
    label: '左上'
  },
  {
    value: 'bottom-left',
    label: '左下'
  }
]

const radioShape = [
  {
    value: 'circle',
    label: '圆形'
  },
  {
    value: 'square',
    label: '方形'
  }
]

const target = [
  {
    label: '通用事件',
    value: 'common'
  },
  {
    label: '组件',
    value: 'component'
  },
  {
    label: '页面',
    value: 'page'
  }
]

const commonEvent = [
  {
    label: '跳转页面',
    value: 'navigate'
  },
  {
    label: '发送请求',
    value: 'request'
  }
]

const paramsType = [
  {
    label: '组件入参',
    value: 'props'
  },
  {
    label: '样式入参',
    value: 'style'
  },
  {
    label: '插槽文字',
    value: 'child'
  },
  {
    label: '数据集参数',
    value: 'dataset'
  },
  {
    label: '额外样式',
    value: 'extraStyle'
  },
  {
    label: '调用组件方法',
    value: 'methods'
  }
]

const source = [
  {
    value: 'static',
    label: '静态数据'
  },
  {
    value: 'event',
    label: '事件参数'
  },
  {
    value: 'custom',
    label: '自定义'
  }
]

const dataset = [
  {
    label: '静态',
    value: 'static'
  },
  {
    label: '动态',
    value: 'dynamic'
  },
  {
    label: '继承',
    value: 'extend'
  }
]

const overflow = [
  {
    label: '隐藏',
    value: 'hidden'
  },
  {
    label: '显示',
    value: 'visible'
  },
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '滚动条',
    value: 'scroll'
  }
]

const whiteSpace = [
  {
    label: '正常',
    value: 'normal'
  },
  {
    label: '不换行',
    value: 'nowrap'
  },
  {
    label: '保留',
    value: 'pre'
  }
]

const textOverflow = [
  {
    label: '裁剪',
    value: 'clip'
  },
  {
    label: '省略',
    value: 'ellipsis'
  }
]

const textDecoration = [
  {
    value: 'none',
    label: '默认'
  },
  {
    value: 'underline',
    label: '下划线'
  },
  {
    value: 'overline',
    label: '上划线'
  },
  {
    value: 'line-through',
    label: '中划线'
  },
  {
    value: 'blink',
    label: '闪烁'
  }
]

const display = [
  {
    label: '不显示',
    value: 'none'
  },
  {
    label: '块级',
    value: 'block'
  },
  {
    label: '弹性盒子',
    value: 'flex'
  },
  {
    label: '内联元素',
    value: 'inline'
  },
  {
    label: '行内块元素',
    value: 'inline-block'
  },
  {
    label: '继承父元素',
    value: 'inherit'
  }
]

const textDecorationStyle = [
  {
    value: 'solid',
    label: '实线'
  },
  {
    value: 'double',
    label: '双线'
  },
  {
    value: 'dotted',
    label: '点状'
  },
  {
    value: 'dashed',
    label: '虚线'
  },
  {
    value: 'wavy',
    label: '波浪线'
  }
]

const selectMode = [
  {
    label: '单列模式',
    value: 'single-column'
  },
  {
    label: '多列模式',
    value: 'mutil-column'
  },
  {
    label: '多列联动',
    value: 'mutil-column-auto'
  }
]

const noticeBarType = [
  {
    label: '主要',
    value: 'primary'
  },
  {
    label: '信息',
    value: 'info'
  },
  {
    label: '错误',
    value: 'error'
  },
  {
    label: '成功',
    value: 'success'
  },
  {
    label: '无',
    value: 'none'
  }
]

const noticeBarMode = [
  {
    label: '垂直',
    value: 'vertical'
  },
  {
    label: '水平',
    value: 'horizontal'
  }
]

const noticeBarState = [
  {
    label: '播放',
    value: 'play'
  },
  {
    label: '暂停',
    value: 'paused'
  }
]

const tagType = [
  {
    label: '主要',
    value: 'primary'
  },
  {
    label: '成功',
    value: 'success'
  },
  {
    label: '信息',
    value: 'info'
  },
  {
    label: '警告',
    value: 'warning'
  },
  {
    label: '错误',
    value: 'error'
  }
]

const tagSize = [
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '迷你',
    value: 'mini'
  }
]

const tagShape = [
  {
    label: '方形',
    value: 'square'
  },
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '左圆',
    value: 'circleLeft'
  },
  {
    label: '右圆',
    value: 'circleRight'
  }
]

const tagMode = [
  {
    label: '明亮',
    value: 'light'
  },
  {
    label: '暗',
    value: 'dark'
  },
  {
    label: '朴素',
    value: 'plain'
  }
]

const options: any = {
  position,
  borderStyle,
  fontFamily,
  fontStyle,
  display,
  horizontalAlignment,
  inputType,
  inputAlign,
  popupMode,
  textAlign: inputAlign,
  closeIconPos,
  radioShape,
  target,
  paramsType,
  source,
  dataset,
  overflow,
  whiteSpace,
  textOverflow,
  textDecoration,
  textDecorationStyle,
  selectMode,
  noticeBarType,
  noticeBarMode,
  noticeBarState,
  tagType,
  tagSize,
  tagShape,
  tagMode
}

const ellipsis = [
  {
    label: '默认',
    value: 0
  },
  {
    label: '显示一行',
    value: 1
  },
  {
    label: '显示两行',
    value: 2
  }
]

const thumbSize = [
  {
    label: '大图',
    value: 'lg'
  },
  {
    label: '一般',
    value: 'medium'
  },
  {
    label: '小图',
    value: 'sm'
  }
]

const direction = [
  {
    label: '横向',
    value: 'row'
  },
  {
    label: '纵向',
    value: 'column'
  }
]

const uniUiOptions: any = {
  ellipsis,
  thumbSize,
  direction
}

const withOptions = (comClass: any) => {
  comClass.prototype.getOptions = function (key: string) {
    return options[key] || uniUiOptions[key]
  }
}

export { options, uniUiOptions }

export default withOptions
