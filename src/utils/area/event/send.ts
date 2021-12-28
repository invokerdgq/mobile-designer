import { Component, Vue } from 'vue-property-decorator'
import bus from './bus'

@Component({})
export default class EventSend extends Vue {
    initSend (this: any, eventInfo: any, params: any) {// eventInfo 是事件配置信息 params 是事件参数 LIST_INDEX 是列表模式的索引 参数放在事件参数中
        switch (eventInfo.target) {
            case 'common':
                bus.$emit('common', { eventInfo, params: { ...params, LIST_INDEX: this.index } })
                break
            case 'component':
                bus.$emit(`component-${eventInfo.id}`,{ eventInfo, params: { ...params, LIST_INDEX: this.index } })
                break
            case 'page':
                bus.$emit('page', { eventInfo, params: { ...params, LIST_INDEX: this.index } })
        }
    }
}
