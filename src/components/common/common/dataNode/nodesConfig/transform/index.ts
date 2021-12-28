export default {
    ['data-transform-boolean']: (id: string, pIds: Array<string>, cfg: any = null) => {
        return `const ${id} = Boolean(${pIds[0]})`
    },
    ['data-transform-number']: (id: string, pIds: Array<string>, cfg: any = null) => {
        return `const ${id} = Number(${pIds[0]})`
    },
    ['data-transform-string']: (id: string, pIds: Array<string>, cfg: any = null) => {
        return `const ${id} = String(${pIds[0]})`
    }
}
