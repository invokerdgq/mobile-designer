import { completeCom } from '@/components/common/widgets/helper'

const Text: any = {
  name: 'text',
  label: '文本',
  child: '一段文本',
  config: {
    props: {},
    propsDec: {},
    class: {},
    nativeOn: {
      click: []
    },
    nativeOnDec: {
      click: {
        label: '点击'
      }
    },
    on: {},
    onDec: {}
  }
}

completeCom(Text, {
  width: 70,
  height: 22
})

export default Text
