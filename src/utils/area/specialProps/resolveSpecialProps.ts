import { Component, Vue } from 'vue-property-decorator'

function generateTree (pId: any, source: any, indexObj: any): Array<any> {
    const s = JSON.parse(JSON.stringify(source))
    const pSource = s.filter((item: any) => {
        return item[indexObj.PARENT_ID] == pId
    })
    const last = s.filter((item: any) => {
        return item[indexObj.PARENT_ID] != pId
    })
    return pSource.map((rItem: any) => {
        const rs = Object.keys(indexObj).reduce((pre: any, item: any) => {
           pre[item] = rItem[indexObj[item]]
           return pre
        }, {})
        const children = generateTree(rItem[indexObj.value], last, indexObj)
        if (children.length > 0) {
            rs.children = children
        }
        return rs
    })
}

function getIndexObj (keyDec: any, dimensionsAlias: any) {
    return Object.keys(keyDec).reduce((pre: any, item1: string) => {
        pre[item1] = dimensionsAlias.findIndex((d: any) => {
            return d.name === keyDec[item1]
        })
        return pre
    }, {})
}

@Component({})
export default class ResolveStyle extends Vue {
    resolvePropsS (this: any, com: any) {
        if (com.config.propsS) {
            Object.keys(com.config.propsS).forEach((item: string) => {
                com.config.props[item] = this.getSpecialData(com, item)
            })
        }
    }

    getSpecialData (this: any, com: any, item: string): Array<any> {
        const data = this.getTrueDataset(com)
        const config = com.config.propsS[item]
        let indexObject: any = null
        if (!Array.isArray(config.key)) {
            indexObject = getIndexObj(config.key || {}, data[data.type].dimensionsAlias)
        }
        switch (config.type) {
            case 'arrayObject':
               return  data[data.type].source.map((item: any) => {
                   const result =  JSON.parse(JSON.stringify(config.key || {}))
                    Object.keys(result).forEach((key: string) => {
                        result[key] = item[indexObject[key]]
                    })
                    return result
                })
            case 'arraySimple':
                const index = data[data.type].dimensionsAlias.findIndex((d: any) => {
                    return d.name === config.key
                })
                return data[data.type].source.map((item: any) => {
                    return item[index]
                })
            case 'arrayTree':
                const indexList = Object.keys(indexObject).map((item: any) => {
                    return indexObject[item]
                })
                if (indexList.indexOf(-1) > -1) return [{}]
                return generateTree(0, data[data.type].source, indexObject)
            case 'arrayMulti':
                const res =  JSON.parse(JSON.stringify(config.key || []))
                return res.map((result: any, index: number) => {
                    return data[data.type].source.map((item: any) => {
                        const result1 = JSON.parse(JSON.stringify(result))
                        const indexObject = getIndexObj(config.key[index], data[data.type].dimensionsAlias)
                        Object.keys(result1).forEach((key: string) => {
                            result1[key] = item[indexObject[key]]
                        })
                        return result1
                    })
                })
            default :
                return []
        }
    }
}
