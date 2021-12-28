import { v4 as uuidv4 } from 'uuid'
import Vue from 'vue'
import dataset from '@/components/common/widgets/dataset.ts'
import WhStyle, { Wh } from '@/utils/editor/style/WH.ts'

class SinglePageInfo {
  name = ''
  route = ''
  desc = ''
  id = ''
  config: any = {
    style: {
      width: 454,
      height: 782
    },
    styleDec: {
      Wh: JSON.parse(JSON.stringify(Wh))
    }
  }

  global:any = {}
  components: any = {}
  dataset: any = []
  currentComponent: any = null
  private currentComId = ''

  constructor (props: any) {
    this.name = props.name
    this.route = props.route
    this.desc = props.desc
    this.dataset.push(JSON.parse(JSON.stringify(dataset)))
    this.config.styleDec.Wh.style.width.options.disabled = true// 页面宽度不允许改变
    if (!props.id) {
      this.id = uuidv4()
    } else {
      this.id = props.id
    }
    if (props.components) {
      this.components = props.components
    }
  }

  addComponent (com: any) {
    Vue.set(this.components, com.id, com)
    this.components = { ...this.components }
  }

  deleteComponent (com: any) {
    Vue.delete(this.components, com.id)
    this.components = { ...this.components }
  }

  updateComponent (com: any) {
    this.components[com.id] = JSON.parse(JSON.stringify(com))
  }

  updatePageInfo (info: any) {
    this.name = info.name
    this.route = info.route
    this.desc = info.desc
  }

  setCurrentComponent (id: string|null) {
    if (id) {
      this.currentComponent = this.components[id]
      return
    }
    this.currentComponent = null
  }

  setComponentPosition (left: number, top: number) {
    if (!this.currentComponent) return
    this.currentComponent.position.left += left
    this.currentComponent.position.top += top
  }

  setComponentSize (w: number, h: number) {
    if (!this.currentComponent) return
    this.currentComponent.config.style.width += w
    this.currentComponent.config.style.height += h
  }

  setComponentProps (props: any) {
    if (!this.currentComponent) return
    this.currentComponent.config.props = props
  }

  setComponentStyle (style: any) {
    if (!this.currentComponent) return
    this.currentComponent.config.style = style
  }

  addComponentExtraStyle (className: string, cssStyle: any) {
    this.currentComponent.extraStyle = {
      ...this.currentComponent.extraStyle,
      [className]: cssStyle
    }
  }

  deleteComponentExtraStyle (index: number) {
    this.currentComponent.extraStyle.splice(index, 1)
  }

  deleteComponentExtraStyleItem (index: number, key: string) {
    Vue.delete(this.currentComponent.extraStyle[index].style, key)
    this.currentComponent.extraStyle[index].style = {
      ...this.currentComponent.extraStyle[index].style
    }
  }

  addComponentExtraStyleItem (index: number, key: string, value: string|number) {
    Vue.set(this.currentComponent.extraStyle[index].style, key, value)
    Vue.set(this.currentComponent.extraStyle[index].styleData, key, {
      enabled: false,
      type: '',
      encode: ''
    })
    this.currentComponent.extraStyle[index].style = {
      ...this.currentComponent.extraStyle[index].style
    }
    this.currentComponent.extraStyle[index].styleData = {
      ...this.currentComponent.extraStyle[index].styleData
    }
  }
}

function generatePage (props: any) {
  return new SinglePageInfo(props)
}

export { generatePage }
