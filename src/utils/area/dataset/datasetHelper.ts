import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DatasetHelper extends Vue {
    getFieldData (this: any, field: string, idx: any = 0): any {
        let com = this.comInfo
        let i = -1
        if (com.dataset.type === 'extend') com = this.pageInfo.components[this.comInfo.dataset.extend.id]
        const index = com.dataset[com.dataset.type].columnList.findIndex((item: any) => {
            return item.name === field
        })
        if (typeof idx === 'number') {
            i = idx
        } else {
            i = idx[this.comInfo.dataset.extend.id]
        }
        return com.dataset[com.dataset.type].source[i][index]
    }

    getTrueDataset (this: any, com: any) {
        if (com.dataset.type === 'extend') {
            return this.pageInfo.components[com.dataset.extend.id].dataset
        }
        return com.dataset
    }
}
