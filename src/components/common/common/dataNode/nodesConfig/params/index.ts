export default {
    params: (id: string, index: number) => {
        return `const ${id} = P${index} \n`
    }
}
