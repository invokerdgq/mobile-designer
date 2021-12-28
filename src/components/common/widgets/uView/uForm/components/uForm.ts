import { completeCom } from '@/components/common/widgets/helper'

const uForm: any = {
  name: 'u-form',
  label: '表单容器',
  config: {
    props: {},
    propsDec: {},
    class: {},
    nativeOn: {},
    nativeOnDec: {},
    on: {},
    onDec: {}
  },
  child: {
    default: []
  },
  childDec: {
    default: {
      label: '默认插槽',
      hasListMode: true,
      listMode: false,
      prefixCom: 'uFormItem'
    }
  },
  methods: {
    setRules: [],
    resetFields: [],
    validate: []
  },
  methodsDec: {
    setRules: {
      label: '设置校验规则',
      params: 'rules'
    },
    resetFields: {
      label: '重置表单校验'
    },
    validate: {
      label: '校验整个表单',
      cbType: 'normal',
      params: {
        valid: '是否通过校验'
      }
    }
  }
}

completeCom(uForm, {
  width: 350,
  height: 450
})

export default uForm
