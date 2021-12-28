import { options } from '@/utils/editor/options/selectOptions'

const FontStyle = {
  fontFamily: '',
  fontSize: 14,
  fontStyle: '',
  color: 'rgba(0,0,0,1)',
  fontWeight: 400
}

const FontStyleDec = {
  fontFamily: {
    label: '字体',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.fontFamily))
    }
  },
  fontSize: {
    label: '字体大小',
    component: 'el-input-number',
    options: {}
  },
  color: {
    label: '字体颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true
    }
  },
  fontStyle: {
    label: '字体风格',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.fontStyle))
    }
  },
  fontWeight: {
    label: '字体粗细',
    component: 'el-input-number',
    options: {
      step: 100,
      min: 100,
      max: 900
    }
  }
}

const Font = {
  label: '字体',
  value: 'Font',
  style: FontStyleDec
}

export default FontStyle

export { Font }
