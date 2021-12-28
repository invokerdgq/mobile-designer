import { getTrueData, getIndex } from '@/components/common/common/dataNode/nodesConfig/fcString'

export default {
    ['data-logic-switch-map']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        let result = `let ${id} = ''\n`
        + `switch (${pIds[idx]}) {`
        cfg.eCfg.forEach((item: any) => {
            if (item.default === undefined) {
                let form = getTrueData(pIds, item.from)
                let to = getTrueData(pIds, item.to)
                result += `\n case "${form}" :\n`
                    + `${id} = ${to} \n break`
            } else {
                let to = getTrueData(pIds, item.to)
                result += `\n default :\n`
                    + `${id} = ${to}`
            }
        })
        return result += '\n } \n'
    },
    ['data-logic-judge']: (id: string, status: string, pIds: Array<string>, cfg: any, str: string) => {
        let judgeString = ''
        let result = ''
        const sReturn = getTrueData(pIds, cfg.eCfg.s)
        const fReturn = getTrueData(pIds, cfg.eCfg.f)
        cfg.eCfg.judge.forEach((item: any) => {
            const leftV = getTrueData(pIds, item.left)
            const rightV = getTrueData(pIds, item.right)
            judgeString += item.leftSign + leftV + item.compare + rightV + item.rightSign
        })
        if (status === 's') {
            result = `if (${judgeString}) {\n` +
                `const ${id} = ${sReturn}\n` +
                `${str}\n` +
                '}'
        } else {
            result = `if (!(${judgeString})) {\n` +
                `const ${id} = ${fReturn}\n` +
                `${str}\n` +
                '}'
        }
        return result
    }
}
