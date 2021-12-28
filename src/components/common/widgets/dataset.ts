const dataset = {
  type: 'static',
  static: {
    encode: {
      value: 'title',
      disabled: ''
    },
    dimensions: ['title', 'desc'],
    dimensionsAlias:
      [
        { name: 'title', alias: '标题', type: 'VARCHAR2' },
        { name: 'desc', alias: '说明', type: 'VARCHAR2' }
      ],
    columnList:
      [
        { index: 0, aggType: null, name: 'title' },
        { index: 1, aggType: null, name: 'desc' }
      ],
    source:
      [
        ['sh', '上海'],
        ['bj', '北京'],
        ['gz', '广州'],
        ['sz', '深圳']
      ]
  },
  dynamic: {
    encode: {
      value: 'title',
      disabled: ''
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
      value: 'title',
      disabled: ''
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

export default dataset
