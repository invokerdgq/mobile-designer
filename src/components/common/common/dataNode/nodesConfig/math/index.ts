export default {
    ['data-math-add']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = `
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` + ${item}`
            }
        })
        return result
    },
    ['data-math-subtract']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = `
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` - ${item}`
            }
        })
        return result
    },
    ['data-math-multiply']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = `
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` * ${item}`
            }
        })
        return result
    },
    ['data-math-divide']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = `
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` / ${item}`
            }
        })
        return result
    },
    ['data-math-residue']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = `
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` % ${item}`
            }
        })
        return result
    },
    ['data-math-average']: (id: string, pIds: Array<string>, cfg: any) => {
        let result = `const ${id} = (`
        pIds.forEach((item: any, idx: number) => {
            if (idx === 0) {
                result += `${item}`
            } else {
                result += ` + ${item}`
            }
        })
        result += `) / ${pIds.length}`
        return result
    }
}
