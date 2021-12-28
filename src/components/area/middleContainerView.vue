<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import Formate from '@/utils/area/formateComponent'
import EventReceive from '@/utils/area/event/receive'
import EventSend from '@/utils/area/event/send'
import ResolveStyle from '@/utils/area/style/resolveStyle'
import ResolveChild from '@/utils/area/child/resolveChild'
import DatasetHelper from '@/utils/area/dataset/datasetHelper'
import ResolveDynamic from '@/utils/area/dynamic'
import resolveChartData from '@/utils/area/uCharts/chartDataHelper'
import { Getter } from 'vuex-class'
import resolveSpecialProps from '@/utils/area/specialProps/resolveSpecialProps'

@Component({
  components: {
    MiddleContainerView
  }
})
export default class MiddleContainerView extends Mixins(resolveSpecialProps, Formate, EventSend, EventReceive, ResolveStyle, ResolveChild, DatasetHelper, ResolveDynamic) {
  @Prop() comInfo!: any
  @Getter('pageInfo') pageInfo!: any
  @Getter('searchEl') searchEl!: boolean
  @Prop() customRefs!: any
  @Prop({ default: null }) indexInfo!: any// 列表模式的索引对象 id: index 键值对 可能多重列表嵌套
  @Prop() isEdit!: boolean
  @Prop({ default: false }) first!: boolean

  middle: any = {}

  created () {
    if (!this.isEdit) {
      this.initReceive()
    }
    this.$emit('setRefs', this.comInfo.id, this)
  }

  resolvePrefixName (h: any): any {
    return function (...arg: any) {
      if (typeof arg[0] === 'string' && arg[0].split('-').length < 2) {
        arg[0] = 'VUni-' + arg[0]
      }
      return h(...arg)
    }
  }

  resolveSend (com: any): void {
    Object.keys(com.config.on).forEach((eN: string) => {
      com.config.on[eN] = (e: any = {}) => {
        com.config.on[eN].forEach((item: any) => {
          this.initSend(item, e)
        })
      }
    })
    Object.keys(com.config.nativeOn).forEach((eN: string) => {
      com.config.nativeOn[eN] = (e: any = {}) => {
        com.config.nativeOn[eN].forEach((item: any) => {
          this.initSend(item, e)
        })
      }
    })
  }

  render (h: any) {
    h = this.resolvePrefixName(h)
    const com = this.comInfo
    if (this.first && com.parentId) return null
    const comJson = JSON.parse(JSON.stringify(com))
    this.resolvePropsS(comJson)
    this.resolveDynamic(comJson)
    let configJson = this.formateComponent(comJson)
    this.resolveClassName(configJson)
    this.resolveStyleClass(configJson)
    this.resolveExtraClass(configJson)
    if (com.config.props && com.config.props.value) {
      configJson.config.on.input = (e: any) => {
        com.config.props.value = e
      }
    }
    if (!configJson.isPopup) {
      configJson.config.style = { ...configJson.style, ...configJson.position }
    }
    configJson.config.ref = `ref-${this.comInfo.id}`
    if (!this.isEdit) {
      this.resolveSend(configJson)
    }
    if (com.name === 'qiun-data-charts') {// uni-app 不支持 $attrs
      resolveChartData(com, configJson)
    }
    return h(com.name, configJson.config, ((typeof com.child === 'string') || com.child === null || com.child === undefined)? [configJson.child]: this.resolveComponentChild(com, h, true))
  }
}
</script>

<style scoped lang="scss">

</style>
