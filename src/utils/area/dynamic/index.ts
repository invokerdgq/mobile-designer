import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class ResolveDynamic extends Vue {
    resolveDynamic (this: any, com: any) {
        const t = ['props', 'style']
        t.forEach((type: string) => {
            const p = com.config[`${type}Data`]
            Object.keys(p).forEach((key: string) => {
                if (p[key].enabled) {
                    const result = this.getDynamicData(p[key])
                    com.config[type][key] = result
                    Vue.set(this.middle, `config-${type}-${key}`, result)
                }
            })
        })
        const e = com.extraStyle
        Object.keys(e).forEach((key: string) => {
            Object.keys(e[key].styleData).forEach((cKey: string) => {
                if (e[key].styleData[cKey].enabled) {
                    const result = this.getDynamicData(e[key].styleData[cKey])
                    com.extraStyle[key].style[cKey] = result
                    Vue.set(this.middle, `extraStyle-${key}-${cKey}`, result)
                }
            })
        })
        if (typeof com.child === 'string') {
            if (com.childData.enabled) {
                const result = this.getDynamicData(com.childData)
                com.child = result
                Vue.set(this.middle, 'child', result)
            }
        }
    }

    getDynamicData (this: any, info: any) {
        switch (info.type) {
            case 'global':
                return this.pageInfo.global[info.encode]
            case 'dataset':
                return this.getFieldData(info.encode, this.indexInfo || 0)
            case 'custom':
                const result = info.custom.params.map((item: any) => {
                    return this.getDependencyResult(item)
                })
                let paramsName = info.custom.params.map((item: any, index: number) => {
                    return 'arg' + index
                })
                return (new Function(...paramsName, info.custom.script))(...result)
        }
    }

    getDependencyResult (this: any, dec: any): any {
        // 参数的结构 [components|page, id, props, key]
        if (!this.customRefs[dec[1]]) return ''
        switch (dec[0]) {
            case 'components':
                switch (dec[2]) {
                    case 'child':
                        if (this.customRefs[dec[1]].comInfo.childData.enabled) {
                            return this.customRefs[dec[1]].middle['child']
                        }
                        return this.customRefs[dec[1]].comInfo.child
                    case 'props':
                        if (this.customRefs[dec[1]].comInfo.config.propsData[dec[3]] && this.customRefs[dec[1]].comInfo.config.propsData[dec[3]].enabled) {
                            return this.customRefs[dec[1]].middle[`config-props-${dec[3]}`]
                        }
                        return this.customRefs[dec[1]].comInfo.config.props[dec[3]]
                    case 'style':
                        if (this.customRefs[dec[1]].comInfo.config.styleData[dec[4]] && this.customRefs[dec[1]].comInfo.config.styleData[dec[4]].enabled) {
                            return this.customRefs[dec[1]].middle[`config-style-${dec[4]}`]
                        }
                        return this.customRefs[dec[1]].comInfo.config.style[dec[4]]
                    case 'extra':
                        if (this.customRefs[dec[1]].comInfo.extraStyle[dec[3]].styleData[dec[5]] && this.customRefs[dec[1]].comInfo.extraStyle[dec[3]].styleData[dec[5]].enabled) {
                            return this.customRefs[dec[1]].middle[`extraStyle-${dec[3]}-${dec[5]}`]
                        }
                        return this.customRefs[dec[1]].comInfo.extraStyle[dec[3]].style[dec[5]]
                    case 'LIST_INDEX':
                        return this.indexInfo[dec[3]]
                    default :
                        // 结构为 type com listComId index ..listComId index ..props|style....
                }
                return ''
            case 'page':
                if (dec[1] === 'global') {
                    return this.currentPage.global[dec[2]]
                }
                return this.currentPage.config.style[dec[2]]
        }

    }
}
