import { options } from '@/utils/editor/options/selectOptions'

const DisplayStyle = {
  display: 'block'
}

const DisplayStyleDec = {
  display: {
    label: '展示',
    component: 'el-select',
    options: {
      data: JSON.parse(JSON.stringify(options.display))
    }
  }
}

const Display = {
  label: '展示形式',
  value: 'Display',
  style: DisplayStyleDec
}

export default DisplayStyle
export { Display }
