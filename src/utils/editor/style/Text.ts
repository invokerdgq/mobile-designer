import { options } from '@/utils/editor/options/selectOptions'

const TextStyle = {
  textAlign: 'left',
  textAlignLast: 'left',
  textDecoration: 'none',
  textDecorationColor: '#f12929',
  textDecorationStyle: 'solid',
  textIndent: 0,
  textOverflow: 'clip',
  textShadow: ''
}

const TextStyleDec = {
  textAlign: {
    label: '文字对其方式',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.textAlign))
    }
  },
  textAlignLast: {
    label: '最后一行对齐',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.textAlign))
    }
  },
  textDecoration: {
    label: '文字装饰',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.textDecoration))
    }
  },
  textDecorationColor: {
    label: '文字装饰颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true,
      colorFormat: 'rgb'
    }
  },
  textDecorationStyle: {
    label: '文字装饰风格',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.textDecorationStyle))
    }
  },
  textIndent: {
    label: '文字缩进',
    component: 'el-input-number',
    options: {}
  },
  textOverflow: {
    label: '文字溢出',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.textOverflow))
    }
  },
  textShadow: {
    label: '文字阴影',
    component: 'el-input'
  }
}

const Text = {
  label: '文字',
  value: 'Text',
  style: TextStyleDec
}

export default TextStyle

export { Text }
