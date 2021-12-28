import { options } from '@/utils/editor/options/selectOptions'

const BorderStyle = {
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderTopColor: 'rgba(90,90,90,1)',
  borderRightColor: 'rgba(90,90,90,1)',
  borderBottomColor: 'rgba(90,90,90,1)',
  borderLeftColor: 'rgba(90,90,90,1)',
  borderTopStyle: 'solid',
  borderRightStyle: 'solid',
  borderBottomStyle: 'solid',
  borderLeftStyle: 'solid',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderCollapse: 'separate'
}

const BorderStyleDec = {
  borderTopWidth: {
    label: '上边框宽度',
    component: 'el-input-number',
    options: {}
  },
  borderRightWidth: {
    label: '右边框宽度',
    component: 'el-input-number',
    options: {}
  },
  borderBottomWidth: {
    label: '下边框宽度',
    component: 'el-input-number',
    options: {}
  },
  borderLeftWidth: {
    label: '左边框宽度',
    component: 'el-input-number',
    options: {}
  },
  borderTopColor: {
    label: '上边框颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true,
      colorFormat: 'rgb'
    }
  },
  borderRightColor: {
    label: '右边框颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true,
      colorFormat: 'rgb'
    }
  },
  borderBottomColor: {
    label: '下边框颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true,
      colorFormat: 'rgb'
    }
  },
  borderLeftColor: {
    label: '左边框颜色',
    component: 'el-color-picker',
    options: {
      showAlpha: true,
      colorFormat: 'rgb'
    }
  },
  borderTopStyle: {
    label: '上边框类型',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.borderStyle))
    }
  },
  borderRightStyle: {
    label: '右边框类型',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.borderStyle))
    }
  },
  borderBottomStyle: {
    label: '下边框类型',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.borderStyle))
    }
  },
  borderLeftStyle: {
    label: '左边框类型',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.borderStyle))
    }
  },
  borderTopLeftRadius: {
    label: '左上圆角宽度',
    component: 'el-input-number',
    options: {}
  },
  borderTopRightRadius: {
    label: '右上圆角宽度',
    component: 'el-input-number',
    options: {}
  },
  borderBottomLeftRadius: {
    label: '左下圆角宽度',
    component: 'el-input-number',
    options: {}
  },
  borderBottomRightRadius: {
    label: '右下圆角宽度',
    component: 'el-input-number',
    options: {}
  }
}

const Border = {
  label: '边框',
  value: 'Border',
  style: BorderStyleDec
}

export default BorderStyle

export { Border }
