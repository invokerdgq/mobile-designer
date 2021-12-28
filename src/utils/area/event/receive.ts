import { Component, Vue } from 'vue-property-decorator'
import bus from './bus'

@Component({})
export default class EventReceive extends Vue {
    initReceive (this: any) {
      bus.$on(`component-${this.comInfo.id}`, this.receiveResolve)
    }

    receiveResolve (this: any, data: any) {
        const { eventInfo: info, params } = data
        switch (info.type) {
            case 'props':
                this.comInfo.config.props[info.key] = this.getNewValue(info, params)
                break
            case 'style':
                this.comInfo.config.style[info.key] = this.getNewValue(info, params)
                break
            case 'extraStyle':
                this.comInfo.extraStyle[info.class][info.key] = this.getNewValue(info, params)
                break
            case 'methods':
                this.$refs[`ref-${this.comInfo.id}`][info.key]()
                break
            case 'dataset':
                break
            case 'child':
                this.comInfo.child = this.getNewValue(info, params)
                break
        }
    }

    getNewValue (this: any, info: any, params: any): any {
        switch (info.new.type) {
            case 'static':
                return info.new.value
            case 'global':
                return this.pageInfo.global[info.new.key]
            case 'event':
                return params[info.new.key]
            case 'dataset':
                return this.getFieldData(info.new.key, 0)
            case 'custom':
                return new Function('evt', 'page', 'components', info.new.script)(params, this.pageInfo, [])
        }
    }
}
