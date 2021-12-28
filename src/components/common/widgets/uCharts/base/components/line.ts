import { getStyle, resolveBindData } from '@/components/common/widgets/helper.ts'
import getBase from '@/components/common/widgets/uCharts/baseConfig.ts'
import chartDataset from '@/components/common/widgets/chartDataset.ts'

const uChartsLine = {
  name: 'qiun-data-charts',
  label: '折线图',
  config: {
    ...getBase('line'),
    style: {},
    styleDec: {},
    styleUp: {
      width: true,
      height: true
    },
    class: {},
    on: {},
    onDec: {},
    nativeOn: {},
    nativeOnDec: {}
  },
  extraStyle: {},
  dataset: {
    type: ''
  },
  child: {},
  childDec: {}
}

getStyle(uChartsLine, {
  width: 300,
  height: 300
})

uChartsLine.dataset = JSON.parse(JSON.stringify(chartDataset))

resolveBindData(uChartsLine)

export default uChartsLine
