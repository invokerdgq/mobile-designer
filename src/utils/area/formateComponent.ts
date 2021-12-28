import { Component, Vue } from 'vue-property-decorator'

const styleSizeRex = /left|top|right|bottom|width|length|iconSize|height|fontSize|border|padding|margin|(Right$)|(Top$)|(Left$)|(Buttom$)|(Width$)|(Height$)/
const propsRex = /length|iconSize|size|width|height/

function canTransform (val: any): boolean {
    if (typeof val === 'number') {
        return true
    } else if (typeof val === 'string') {
        return !isNaN(Number(val))

    } else {
        return false
    }
}

function resolveConfigStyle (style: any) {
    Object.keys(style).forEach((key: string) => {
        if (styleSizeRex.test(key) && canTransform(style[key])) {
            style[key] = style[key] + 'px'
        }
    })
}

@Component({})
export default class formate extends Vue {
    // getScreenWidth () {
    //     return appNode.offsetWidth
    // }

    resolvePosition (poi: any) {
        if (!poi) return
        poi.left = poi.left + 'px'
        poi.top = poi.top + 'px'
    }

    resolveConfigStyle (style: any) {
        Object.keys(style).forEach((key: string) => {
            if (styleSizeRex.test(key) && canTransform(style[key])) {
                style[key] = style[key] + 'px'
            }
        })
    }

    resolveExtraStyle (extra: any) {
        Object.keys(extra).forEach((key: string) => {
            this.resolveConfigStyle(extra[key].style)
        })
    }

    resolveConfigProps (props: any) {
        Object.keys(props).forEach((key: string) => {
            if (propsRex.test(key) && canTransform(props[key])) {
                props[key] = props[key] * 2
            }
        })
    }

    formateComponent (comJson: any, exclude: boolean = false) {
        if (!exclude) this.resolvePosition(comJson.position)
        this.resolveConfigStyle(comJson.config.style)
        this.resolveConfigProps(comJson.config.props)
        this.resolveExtraStyle(comJson.extraStyle)
        return comJson
    }
}

export { resolveConfigStyle }
