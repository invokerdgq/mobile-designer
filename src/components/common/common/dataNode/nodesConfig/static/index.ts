export default {
    ['data-static-boolean']: (id: string, pIds: Array<string> = [], cfg: any) => {
        return `const ${id} = ${cfg.eCfg.value} \n`
    },
    ['data-static-number']: (id: string, pIds: Array<string> = [], cfg: any) => {
        return `const ${id} =${cfg.eCfg.value} \n`
    },
    ['data-static-string']: (id: string, pIds: Array<string> = [], cfg: any) => {
        return `const ${id} = ${cfg.eCfg.value} \n`
    }
}
