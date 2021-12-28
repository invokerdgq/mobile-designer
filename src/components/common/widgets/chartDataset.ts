const chartDataset = {
  type: 'static',
  static: {
    encode: {
      xAxis: 'time',
      series1: 'tradeA'
    },
    dimensions: ['time', 'tradeA', 'tradeB', 'tradeC'],
    dimensionsAlias:
      [
        { name: 'time', alias: '时间', type: 'VARCHAR2' },
        { name: 'tradeA', alias: '交易A', type: 'NUMBER' },
        { name: 'tradeB', alias: '交易B', type: 'NUMBER' },
        { name: 'tradeC', alias: '交易C', type: 'NUMBER' }
      ],
    columnList:
      [
        { index: 0, aggType: null, name: 'time' },
        { index: 1, aggType: null, name: 'tradeA' },
        { index: 2, aggType: null, name: 'tradeB' },
        { index: 3, aggType: null, name: 'tradeC' }
      ],
    source:
      [
        ['2018', 20, 40, 30],
        ['2019', 40, 80, 90],
        ['2020', 100, 30, 40],
        ['2021', 50, 90, 10]
      ]
  },
  dynamic: {
    encode: {
      xAxis: 'time',
      series1: 'tradeA'
    },
    dataSetId: null,
    dimensions: [],
    autoUpdate: false,
    autoUpdateTime: null,
    dimensionsAlias: [],
    columnList: [],
    source: []
  },
  local: {
    encode: {
      xAxis: 'time',
      series1: 'tradeA'
    },
    dataSetId: null,
    dimensions: [],
    autoUpdate: false,
    autoUpdateTime: null,
    dimensionsAlias: [],
    columnList: [],
    source: []
  },
  extend: {
    id: '',
    index: -1// 当组件集成
  }
}

export default chartDataset
