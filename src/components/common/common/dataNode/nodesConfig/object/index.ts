import { getTrueData, getIndex } from '@/components/common/common/dataNode/nodesConfig/fcString'

export default {
    ['data-object-add-key']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        let result =  `const ${id} = { ...${pIds[idx]}, \n`
        cfg.eCfg.forEach((item: any) => {
            let rs = ''
            rs += getTrueData(pIds, item.key)
            rs += ':' + getTrueData(pIds, item.value)
            rs += ',\n'
            result += rs
        })
        result += ' } \n'
        return result
    },
    ['data-object-delete-key']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        let result =  `const ${id} = { ...${pIds[idx]} }`
        cfg.eCfg.forEach((item: any) => {
           result += `\n delete ${id}.${getTrueData(pIds, item)}`
        })
        return result
    },
    ['data-object-change-key']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        let result = `const ${id} = { ...${pIds[idx]} }`
        cfg.eCfg.forEach((item: any) => {
            result += `\n ${id}.${getTrueData(pIds, item.value)} = ${id}.${getTrueData(pIds, item.key)}`
            result += `\n delete ${id}.${getTrueData(pIds, item.key)}`
        })
        return result
    },
    ['data-object-change-value']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        let result = `const ${id} = { ...${pIds[idx]} }`
        cfg.eCfg.forEach((item: any) => {
            result += `\n ${id}.${getTrueData(pIds, item.from)} = ${getTrueData(pIds, item.to)}`
        })
        return result
    },
    ['data-object-get-value']: (id: string, pIds: Array<string>, cfg: any) => {
        const idx = getIndex(cfg)
        return `const ${id} = ${pIds[idx]}.${getTrueData(pIds, cfg.eCfg.key)}`
    },
    ['data-object-key-to-array']: (id: string, pIds: Array<string>) => {
        return  `const ${id} = Object.keys(${pIds[0]})\n`
    },
    ['data-object-value-to-array']: (id: string, pIds: Array<string>) => {
        return  `const ${id} = Object.keys(${pIds[0]}).map((item) => { return ${pIds[0]}[item])\n`
    }
}
