const PaddingStyle = {
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0
}

const PaddingStyleDec = {
  paddingTop: {
    label: '上边距',
    component: 'el-input-number'
  },
  paddingRight: {
    label: '右边距',
    component: 'el-input-number'
  },
  paddingBottom: {
    label: '下边距',
    component: 'el-input-number'
  },
  paddingLeft: {
    label: '左边距',
    component: 'el-input-number'
  }
}

const Padding = {
  label: '内边距',
  value: 'Padding',
  style: PaddingStyleDec
}

export default PaddingStyle
export { Padding }
