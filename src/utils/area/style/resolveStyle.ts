import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ResolveStyle extends Vue {
    resolveClassName (this: any, com: any) {
        const indexObj = Object.keys(this.indexInfo || {}).map((item: string) => {
            return this.indexInfo[item]
        })
        if (indexObj.length > 0) {
            com.config.class[`comId_class_${com.id}_${indexObj.join('_')}`] = true
        }
    }

    getClassName (this: any) {
        const indexObj = Object.keys(this.indexInfo || {}).map((item: string) => {
            return this.indexInfo[item]
        })
        if (indexObj.length > 0) {
            return `comId_class_${this.comInfo.id}_${indexObj.join('_')}`
        }
        return `comId_class_${this.comInfo.id}`
    }

    resolveStyleClass (this: any, com: any) {
        const className = this.getClassName()
        let result = ''
        let parentEL
        if (this.isEdit) {
            parentEL = document.querySelectorAll('uni-page')[0]
        }
        const newComStyle = JSON.parse(JSON.stringify(com.config.style))
        Object.keys(com.config.styleUp).forEach((key: string) => {
            if (com.config.styleUp[key]) newComStyle[key] += ' !important'
        })
        let styleString
        if (this.searchEl) {
            styleString = JSON.stringify(newComStyle)
        } else {
            styleString = JSON.stringify(newComStyle, ((key, value) => {
                if (/^(border|margin)/.test(key)) {
                    return ''
                }
                return value
            }))
        }
        styleString = styleString.replace(/}$/, ';}')
        styleString = styleString.replace(/(")*,["|}]/g, (m: string) => {
            return m.replace(',', ';')
        })
        styleString = styleString.replaceAll('"', '')
        styleString = styleString.replace(/[A-Z]/g, function (s: any) {
            return '-' + s.toLowerCase()
        })
        styleString = `.${className} ${styleString}`
        result += styleString
        let styleEl = (parentEL || document).querySelectorAll(`style[id*='comId_class_${com.id}'`)
        if (styleEl.length === 0) {
            const el = document.createElement('style')
            el.setAttribute('id', className)
            el.setAttribute('type', 'text/css')
            el.innerText = result;
            (parentEL || document.body).appendChild(el)
        } else {
            const reg = new RegExp('\\.' + className + ' ' + '{(.)*}');
            (styleEl[0] as HTMLElement).innerText = (styleEl[0] as HTMLElement).innerText.replace(reg, '') + '\n' + styleString

        }
    }

    resolveExtraClass (this: any, com: any) {
        const className = this.getClassName()
        let result = ''
        let parentEL
        if (this.isEdit) {
            parentEL = document.querySelectorAll('uni-page')[0]
        }
        Object.keys(com.extraStyle).forEach((cN: any) => {
            const item = com.extraStyle[cN]
            let styleString = JSON.stringify(item.style)
            styleString = styleString.replace(/}$/, ',}')
            styleString = styleString.replace(/(")*,["|}]/g, (m: string) => {
                return m.replace(',', ' !important;')
            })
            styleString = styleString.replaceAll('"', '')
            styleString = styleString.replace(/[A-Z]/g, function (s: any) {
                return '-' + s.toLowerCase()
            })
            if (/comId_class_/.test(cN)) {
                styleString = `.${cN.replace(`comId_class_${com.id}`, className)} ${styleString}`
            } else {
                styleString = `.${className} .${cN} ${styleString}`
            }
            result += styleString
        })
        let styleEl = (parentEL || document).querySelectorAll(`style[id*='comId-${com.id}'`)
        if (styleEl.length === 0) {
            const el = document.createElement('style')
            el.setAttribute('id', `comId-${com.id}`)
            el.setAttribute('type', 'text/css')
            el.innerText = result;
            (parentEL || document.body).appendChild(el)
        } else {
            const el = (styleEl[0] as HTMLElement);
            const reg = new RegExp('\\.' + '[^{]*' + className + '[^{]*' + '{[^}]*}')
            el.innerText = el.innerText.replace(reg, '') + '\n' + result
        }
    }
}
