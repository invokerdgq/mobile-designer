const MarginStyle = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0
}

const MarginStyleDec = {
  marginTop: {
    label: '上边距',
    component: 'el-input-number'
  },
  marginRight: {
    label: '右边距',
    component: 'el-input-number'
  },
  marginBottom: {
    label: '下边距',
    component: 'el-input-number'
  },
  marginLeft: {
    label: '左边距',
    component: 'el-input-number'
  }
}

const Margin = {
  label: '外边距',
  value: 'Margin',
  style: MarginStyleDec
}

export default MarginStyle
export { Margin }
