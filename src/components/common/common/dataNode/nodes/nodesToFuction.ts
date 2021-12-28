import nodeString from '../nodesConfig/index'

function getParamsNode (nodes: any): Array<any> {
    return nodes.filter((node: any) => {
        return node.type === 'custom-params-node'
    })
}

function getReturnNode (nodes: any): Array<any> {
    return nodes.filter((node: any) => {
        return node.type === 'custom-return-node'
    })[0]
}

function getStaticNode (nodes: any): Array<any> {
    return nodes.filter((node: any) => {
        return node.type !== 'custom-params-node' && node.type !== 'custom-return-node' && node.anchorPoints.length === 1
    })
}

/*
* 整体思路 是从返回点出发 按进入返回点的路线个数 依次往回走 最终生成代码 进行合并 最终优化
*
* */
class NodesToFunction {
    nodes: Array<any> = []
    nodesDetail: any = null
    edges: Array<any> = []
    paramsNode: any = []
    returnNode: any = {}
    staticNode: any = []
    nodesInMap: any = {}
    mainFcString = ''
    curLineId = ''
    lineString: any = {} // 以连接点 id + status + '_MIDDLE' 为键 值为每一条线生成的函数字符串 其中不含 isMiddle 为线程 带有isMiddle 为数组循环线程

    constructor(props: any) {
        this.nodes = props.nodes
        this.edges = props.edges
        this.nodesDetail = props.nodesDetail
        this.paramsNode = getParamsNode(this.nodes)
        this.returnNode = getReturnNode(this.nodes)
        this.staticNode = getStaticNode(this.nodes)
        this.nodes.forEach((node: any) => {
            this.nodesInMap[node.id] = this.getNodeIn(node)
        })
        this.nodesInMap = { ...this.nodesInMap }
        Object.keys(this.nodesInMap[this.returnNode.id]).forEach((id: string) => {
            this.lineString[id] = ''
        })
        this.lineString = { ...this.lineString }
    }

    getNodeIn (node: any) {
        const connect = this.edges.filter((edge: any) => {
            return edge.target === node.id
        })
        if (connect.length > 0) {
            return connect.reduce((pre: any, item: any) => {
                const sourceNode = this.nodes.find((node: any) => {
                    return node.id === item.source
                })
                const nodeInfo = this.nodes.find((item1: any) => { return item1.id === item.target })
                let extraSign = (sourceNode.anchorPointsDec[item.sourceAnchor].status ?
                    sourceNode.anchorPointsDec[item.sourceAnchor].status : '') +
                    (nodeInfo.anchorPointsDec[item.targetAnchor].isMiddle ? '_INMIDDLE': '') +
                    (sourceNode.anchorPointsDec[item.sourceAnchor].isMiddle ? '_OUTMIDDLE': '')
                pre[item.source + extraSign] = {
                    nodeType: this.nodesDetail.find((node: any) => {
                        return node.node.id === sourceNode.id
                    }).cfg.nodeType, // 节点类型 方便处理判断节点
                    status: sourceNode.anchorPointsDec[item.sourceAnchor].status, // 判断节点的 成功还是失败 's' 'f'
                }
                return pre
            }, {})
        }
        return null
    }

    begin () {
        // 预先定义 参数 和静态数据
        this.paramsNode.forEach((item: any, index: number) => {
            this.mainFcString += (nodeString as any).params(item.id, index)
        })
        this.staticNode.forEach((item: any) => {
            const nodeECfg = this.getNodeCfg(item.id)
            this.mainFcString += (nodeString as any)[nodeECfg.nodeType.join('-')](item.id, [], nodeECfg)
        })
        this.execute()
    }

    execute () {
        const line = this.nodesInMap[this.returnNode.id]
        Object.keys(line).forEach((id: string) => {
            this.curLineId = id
            this.lineString[id] += `\n return ${id}`
            this.executeCircle(id, line[id], null)
        })
        this.mainFcString += Object.keys(this.lineString).map((id: string) => {
            if (!/INMIDDLE/.test(id)) {
                return this.lineString[id]
            }
            return ''
        }).join('\n')
        this.mainFcString = this.optimizeFc(this.mainFcString)
        console.log('最终生成结果---- \n', this.mainFcString)
    }

    optimizeFc (str: string): string {
        // 主要是对判断进行合并
        return  str
    }

    getNodeCfg (id: string) {
        return this.nodesDetail.find((item: any) => {
            return id === item.node.id
        }).cfg
    }

    getTrueId (id: string): string {
        return id.replace(/(_F_R)|(_S_R)|(_OUTMIDDLE)|(_INMIDDLE)/g, '')
    }

    executeCircle (id: string, cfg: any, ArrayId: any) {
        const trueId = this.getTrueId(id)
        const inNode = this.nodesInMap[trueId]
        const trueArrayId = ArrayId ? this.getTrueId(ArrayId) : ArrayId
        if (trueId === trueArrayId) return
        if (!inNode) return // 静态数据 和 入参 事先先定义 防止重复定义
        const inNodeIdList = Object.keys(inNode).filter((item: any) => {
            return !/INMIDDLE/.test(item)
        }).map((item1: any) => {
            let id = item1
            if (/OUTMIDDLE/.test(item1)) id = this.getTrueId(item1) + '_ELE'
            return id
        }).reverse() // 走执行步骤时 是从后面的参数 开始走的 相应的 作用参数索引  ${PX} 索引都需要处理一下
        const nodeECfg = this.getNodeCfg(trueId)
        if (this.curLineId && this.lineString[this.curLineId] !== undefined) {
            if (/judge/.test(nodeECfg.nodeType.join('-'))) {
                const status = /_F_R/.test(id) ? 'f': 's'
                this.lineString[this.curLineId] = (nodeString as any)[cfg.nodeType.join('-')](id, status, inNodeIdList, nodeECfg, this.lineString[this.curLineId])
            } else if (/array/.test(nodeECfg.nodeType.join('-'))) {
               // 解析数组 的中间处理过程
                let oId = this.curLineId
                const ids = Object.keys(this.nodesInMap[trueId]).filter((inId: string) => {
                    return /INMIDDLE/.test(inId)
                }).reverse()
                let str = ''
                if (ids.length > 0) {
                    ids.forEach((nId: string) => {
                        this.lineString[nId] = ''
                        this.curLineId = nId
                        this.lineString[nId] += `\n return ${nId}`
                        this.executeCircle(nId, this.nodesInMap[trueId][nId], id)
                    })
                    this.curLineId = oId
                    str = ids.map((nId: string) => {
                        return this.lineString[nId]
                    }).join('\n')
                }
                this.lineString[this.curLineId] = (nodeString as any)[cfg.nodeType.join('-')](id, inNodeIdList, str) + this.lineString[this.curLineId]
            }else {
                this.lineString[this.curLineId] = (nodeString as any)[cfg.nodeType.join('-')](id, inNodeIdList, nodeECfg) + this.lineString[this.curLineId]
            }
        }
        inNodeIdList.forEach((item: any) => {
            this.executeCircle(item, inNode[item], ArrayId)
        })
    }
}

export default function generateFc (props: any) {
    const ins = new NodesToFunction(props)
    ins.begin()
    return ins.mainFcString
}


