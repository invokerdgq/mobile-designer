import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ResolveChild extends Vue {
    resolveComponentChild (this: any, com: any, h: any, isView: boolean) {
        /* 默认 插槽 可以添加 多个组件 而具名插槽只能添加一个组件 */
        let nodeList: any = []
        Object.keys(com.child).forEach((slotName: string) => {
            if (slotName === 'default') {
                if (com.child.default.length !== 0) {
                    if (com.childDec && com.childDec[slotName] && com.childDec[slotName].listMode) {
                        let source = []
                        if (com.dataset.type === 'extend') {
                            const pCom = this.pageInfo.components[com.dataset.extend.id]
                            if (typeof this.indexInfo[com.dataset.extend.id] === 'number' && this.indexInfo[com.dataset.extend.id] > -1) {
                                source = [pCom.dataset[pCom.dataset.type].source[this.indexInfo[com.dataset.extend.id]]]
                            } else {
                                source =  pCom.dataset[pCom.dataset.type].source
                            }
                        } else {
                            source = com.dataset[com.dataset.type].source
                        }
                        source.forEach((item: any, index: number) => {
                            nodeList = [...nodeList, ...this.resolveDefaultSlot(com.child[slotName], com.childDec[slotName], h, { ...this.indexInfo|| {}, [this.comInfo.id]: index}, isView)]
                        })
                    } else {
                        nodeList = [...nodeList, ...this.resolveDefaultSlot(com.child[slotName], com.childDec[slotName], h, this.indexInfo, isView)]
                    }
                }
            } else {
                if (com.child[slotName])  nodeList = [...nodeList, this.resolveNameSlot(com.child[slotName], h, isView)]
            }
        })
        return nodeList
    }

    resolveDefaultSlot (this: any, cList: Array<string>, dec: any, h: any, indexInfo: any = null, isView: boolean): Array<any> {
        const mid = isView ? this.constructor.name.replace(/[A-Z]/g, function (s: any) {
            return '-' + s.toLowerCase()
        }).slice(1) : 'draggable-container'
        if (dec.needContainer) {// 处理子元素 绝对定位 父元素 未定义高度 或者高度并未直接作用于 真实的父元素
            const max = cList.reduce((max: Array<number>, id: string) => {
                let com = this.pageInfo.components[id]
                if (((com.position.top + (com.config.style.height || 15)) + (com.config.style.marginTop || 0) + (com.config.style.marginBottom || 0)) > max[0]) max[0] = com.position.top + (com.config.style.height || 15) + (com.config.style.marginTop || 0) + (com.config.style.marginBottom || 0)
                if (((com.position.left + (com.config.style.width || 15)) + (com.config.style.marginLeft || 0) + (com.config.style.marginRight || 0)) > max[1]) max[1] = com.position.left + (com.config.style.width || 15) + (com.config.style.marginLeft || 0) + (com.config.style.marginRight || 0)
                return max
            }, [0, 0])
            return [h('view', { style: {position: 'relative', width: max[1] + 'px', height: max[0] + 'px'}}, [cList.map((id: any) => {
                return h(mid, {
                    props: {
                        comInfo: this.pageInfo.components[id],
                        pageInfo: this.pageInfo,
                        customRefs: this.customRefs,
                        indexInfo
                    }
                })
            })])]
        } else {
            return cList.map((id: any) => {
                return h(mid, {
                    props: {
                        comInfo: this.pageInfo.components[id],
                        pageInfo: this.pageInfo,
                        customRefs: this.customRefs,
                        indexInfo
                    }
                })
            })
        }
    }

    resolveNameSlot (this: any, id: any, h: any, isView: boolean): any {
        const mid = isView ? this.constructor.name.replace(/[A-Z]/g, function (s: any) {
            return '-' + s.toLowerCase()
        }).slice(1) : 'draggable-container'
        return h(mid, {
            props: {
                comInfo: this.pageInfo.components[id],
                pageInfo: this.pageInfo
            },
            slot: this.pageInfo.components[id].config.slot
        })
    }
}
