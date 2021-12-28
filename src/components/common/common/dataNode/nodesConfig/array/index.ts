import { getTrueData } from '@/components/common/common/dataNode/nodesConfig/fcString'

export default {
    ['data-array-concat']: (id: string, pIds: Array<string>) => {
        return `const ${id} = [].concat(${pIds.toString()})`
    },
    ['data-array-filter']: (id: string, pIds: Array<string>, str: string) => {
        return `const ${id} = ${pIds[0]}.filter((${id}_ELE) => { \n` +
            `${str} \n` +
            `}) \n`
    },
    ['data-array-loop']: (id: string, pIds: Array<string>, str: string) => {
        return `const ${id} = ${pIds[0]}.map((${id}_ELE) => { \n` +
            `${str} \n` +
            `}) \n`
    },
    ['data-array-find']: (id: string, pIds: Array<string>, str: string) => {
        return `const ${id} = ${pIds[0]}.find((${id}_ELE) => { \n` +
            `${str} \n` +
            `}) \n`
    },
}
