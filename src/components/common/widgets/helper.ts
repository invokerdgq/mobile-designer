import WhStyle, { Wh } from '@/utils/editor/style/WH'
import Dataset from './dataset'

const resolveBindData = function (com: any): any {
  com.config.propsData = {}
  com.config.styleData = {}
  if (!com.config.styleUp) com.config.styleUp = {}
  if (typeof com.child === 'string') {
    com.childData = {}
  }
  resolveCb(com)
}

const resolveCb = function (com: any): any {
  com.cb = []
}

function getStyle (com: any, options?: any): any {
  com.config.style = {}
  com.config.styleDec = {}
  if (options) {
    if (typeof options.width === 'number') com.config.style.width = options.width
    if (typeof options.height === 'number') com.config.style.height = options.height
    com.config.styleDec = {
      Wh: JSON.parse(JSON.stringify(Wh))
    }
    com.initPoi = {
      width: options.width || 50,
      height: options.height || 50
    }
  } else {
    com.initPoi = {
      width: 50,
      height: 50
    }
  }
  com.position = {
    position: 'absolute',
    left: 0,
    top: 0
  }
  com.extraStyle = []
}

function completeCom (com: any, options?: any) {
  getStyle(com, options)
  resolveBindData(com)
  com.dataset = JSON.parse(JSON.stringify(Dataset))
}

export { getStyle, resolveBindData, completeCom }
