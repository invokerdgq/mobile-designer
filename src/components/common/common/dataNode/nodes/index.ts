import './dataNode'
import './eventNode'
import { v4 as uuidv4 } from 'uuid'
import extraCfg from '@/components/common/common/dataNode/nodes/extraCfg'

function getParamsNode (item: any, index: number) {
    return {
        id: item.join('-'),
        type: 'custom-params-node',
        size: [150, 40],
        style: {
            radius: 8
        },
        x: 100,
        y: 100 + 100 * index,
        anchorPoints: [
            [1, 0.5]
        ],
        anchorPointsDec: [
            {
                name: 'data-out',
                fill: '#215bbe',
                stroke: '#215bbe'
            }
        ],
        label: '参数:' + item[item.length -1],
        labelCfg: {
            fill: '#215bbe'
        },
        extraInfo: {
            name: 'pppp'
        }
    }
}

function getReturnNode () {
    return {
        id: uuidv4() + '-return',
        type: 'custom-return-node',
        size: [150, 40],
        style: {
            radius: 8
        },
        x: 1300,
        y: 600,
        anchorPoints: [
            [0, 0.5]
        ],
        anchorPointsDec: [
            {
                name: 'data-in',
                fill: '#215bbe',
                stroke: '#215bbe'
            }
        ],
        label: '返回节点',
        labelCfg: {
            fill: '#215bbe'
        }
    }
}

function getDataNode (info: any) {
    const dataIn = info.params
    const label = info.nodeName
    const middle = info.middleParams
    const dataOut = info.outParams
    const archIn = Array.from({ length: dataIn }).map((item: any, index: number) => {
        return [0, (index + 1) / (dataIn + 1 )]
    })
    const archInDec = Array.from({ length: dataIn }).map((item: any, index: number) => {
        return {
            name: 'data-in',
            fill: '#215bbe',
            stroke: '#215bbe'
        }
    })
    let archOut: any = [[1, 0.5]]
    let archOutDec: any = [
        {
            name: 'data-out',
            fill: '#215bbe',
            stroke: '#215bbe'
        }
    ]
    let archMiddle: any = []
    let archMiddleDec: any = []
    if (dataOut && dataOut > 1) {
        archOut = Array.from({ length: dataOut }).map((item: any, index: number) => {
            return [1, (index + 1) / (dataOut + 1 )]
        })
        archOutDec = Array.from({ length: dataOut }).map((item: any, index: number) => {
            return {
                name: 'data-out',
                status: index === 0 ? '_S_R': '_F_R',
                fill: '#215bbe',
                stroke: '#215bbe'
            }
        })
    }
    if (middle) {
        archMiddle = Array.from({ length: middle }).map((item: any, index: number) => {
            return [(index + 1) / (middle + 1 ), 2 / 3]
        })
        archMiddleDec = Array.from({ length: middle }).map((item: any, index: number) => {
            return {
                name: index === 0 ? 'data-out' : 'data-in',
                isMiddle: true,
                fill: '#215bbe',
                stroke: '#215bbe'
            }
        })
    }
    const arch = archIn.concat(archMiddle, archOut)
    const archDec = archInDec.concat(archMiddleDec, archOutDec)
    return {
        id: uuidv4() + '-data',
        type: 'custom-data-node',
        size: [140, 50],
        style: {
            radius: 8
        },
        x: 200,
        y: 200,
        anchorPoints: arch,
        anchorPointsDec: archDec,
        label: label,
        labelCfg: {
            fill: '#215bbe'
        }
    }
}

function getEventNode (info: any) {
    return {}
}


function generateNode (node: any) {
    switch (node.type) {
        case 'params' :
            return getParamsNode(node.info, node.idx)
        case 'return' :
            return getReturnNode()
        case 'data' :
            return getDataNode(node.info)
        case 'event' :
            return getEventNode(node.info)
    }
}

function getDataNodeCfg (node: any, info: any) {
    let cfg: any = {
        nodeName: info.nodeName,
        nodeType: info.type
    }
    if (info.params > 1) {
        cfg.pIdx = 0
        cfg.pNum = info.params
    }
    cfg.eCfg = JSON.parse(JSON.stringify(extraCfg[info.type[1] + '-' + info.type[2]]))
    return cfg
}

function generateNodeCfg (type: string, node: any, info: any) {
    switch (type) {
        case 'params':
            return {
                nodeName: '参数节点',
                desc: node.id,
                nodeType: 'params'
            }
        case 'return':
            return {
                nodeName: '返回节点',
                nodeType: 'return'
            }
        case 'data':
            return getDataNodeCfg(node, info)
        case 'event':
            return ''
    }
}

export { generateNodeCfg }

export default generateNode
