import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Inheritance extends Vue {
    hasSlot (com: any) {
        if (typeof com.child === 'object' && com.child !== null) {
            let has = false
            Object.keys(com.child).forEach((key: string) => {
                if (key === 'default') {
                    if (Array.isArray(com.child[key])) {
                        has = true
                    }
                } else {
                    if (com.child[key]) {
                        has = true
                    }
                }
            })
            return has
        } else {
            return false
        }
    }

    isParent (this: any, id: string | null): boolean {
        if (!this.pageInfo.currentComponent) return false
        let parentId: any = this.pageInfo.currentComponent.parentId
        while (parentId) {
            if (id === parentId) return true
            parentId = this.pageInfo.components[parentId].parentId
        }
        return false
    }
}
