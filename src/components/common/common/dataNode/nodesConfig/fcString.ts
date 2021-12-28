import getNodeString from './index'

function generateString (nodes: any, nodesCfg: any, node: any, inIds: Array<string>) {

}

function getTrueData (pIds: Array<string>, val: string) {
    if (/\${P([0-9])+}$/.test(val)) {
        return  pIds[Number(val.replace(/({|})/g, '').split('P')[1])]
    } else {
        return  val
    }
}

function getIndex (cfg: any): number {
    if (cfg.pIdx === undefined) {
        return 0
    } else {
        return cfg.pNum - 1 - cfg.pIdx
    }
}

export { getTrueData, getIndex }
