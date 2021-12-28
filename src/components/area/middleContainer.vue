<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import withResize from '@/utils/area/moveAndResize'
import Formate from '@/utils/area/formateComponent'
import ResolveStyle from '@/utils/area/style/resolveStyle'
import ResolveChild from '@/utils/area/child/resolveChild'
import ResolveDynamic from '@/utils/area/dynamic/index'
import { editorBus } from '@/utils/area/event/bus'
import DatasetHelper from '@/utils/area/dataset/datasetHelper'
import DraggableContainer from './draggableContainer.vue'
import resolveChartData from '@/utils/area/uCharts/chartDataHelper'
import resolveSpecialProps from '@/utils/area/specialProps/resolveSpecialProps'
import { Getter } from 'vuex-class'

@Component({
  components: {
    MiddleContainer,
    DraggableContainer
  }
})
@withResize
export default class MiddleContainer extends Mixins(Formate, ResolveStyle, ResolveChild, ResolveDynamic, DatasetHelper, resolveSpecialProps) {
  @Getter('searchEl') searchEl!: boolean
  @Prop() comInfo!: any
  @Prop() customRefs: any
  @Prop() pageInfo!: any
  @Prop({ default: null }) indexInfo!: any// 列表模式的索引对象 id: index 键值对 可能多重列表嵌套

  middle: any = {} // 动态配置的中间变量 a 依赖 b b依赖 c b的某个属性是动态配置的 a 获取值需要递归往上找多次 影响性能

  resolvePrefixName (h: any): any {
    return function (...arg: any) {
      if (typeof arg[0] === 'string' && arg[0].split('-').length < 2) {
        arg[0] = 'VUni-' + arg[0]
      }
      return h(...arg)
    }
  }

  created (this: any) {
    editorBus.$on(`SELECT_COM_${this.comInfo.id}`, () => { // 处理有些组件点击事件 阻止了冒泡
      this.pageInfo.setCurrentComponent(this.comInfo.id)
    })

    editorBus.$on('POI_CHANGE_STOP', () => { // 有些组件 大小变化需要 调用resize类似方法 在变化完成之后再触发
      if (this.pageInfo.currentComponent && this.comInfo.id === this.pageInfo.currentComponent.id) {
        this.$nextTick(() => {
          this.$refs[`ref-${this.comInfo.id}`] && this.$refs[`ref-${this.comInfo.id}`].resizeHandler && this.$refs[`ref-${this.comInfo.id}`].resizeHandler()
        })
      }
    })

    if (this.comInfo.needRm) {
      editorBus.$on('REMOUNT', (id: string) => { // 处理有些组件 入参值初始化一次 并不是动态的
        if (this.comInfo.parentId === id || this.comInfo.id === this.pageInfo.components[id].parentId || this.comInfo.id === id) {
          this.$nextTick(() => {
            if ((this.$refs as any)[`ref-${this.comInfo.id}`]) {
              if ((this.$refs as any)[`ref-${this.comInfo.id}`].init) {
                (this.$refs as any)[`ref-${this.comInfo.id}`].init()
                return
              }
              (this.$refs as any)[`ref-${this.comInfo.id}`].__call_hook('mounted');
            }
          })
        }
      })
    }
    this.$emit('setRefs', this.comInfo.id, this) // 全局统一管理 组件实例 有些数据并不在comInfo 上 例如 处于列表中时 indexInfo 与 动态绑定的中间变量 middle
  }

  updated () {
    editorBus.$emit('REMOUNT', this.comInfo.id)
  }

  render (h: any): any {
    h = this.resolvePrefixName(h)
    const com = this.comInfo
    const comJson = JSON.parse(JSON.stringify(com, ((key, value) => {
      if (key === 'position') {
        return undefined
      }
      return value
    })))
    comJson.extraStyle = JSON.parse(JSON.stringify(com.extraStyle))
    this.resolvePropsS(comJson)
    this.resolveDynamic(comJson)
    let configJson = this.formateComponent(comJson, true)
    this.resolveClassName(configJson)
    this.resolveStyleClass(configJson)
    this.resolveExtraClass(configJson)
    if (com.config.slot) delete configJson.config.slot // 外层带上 slot 内层去掉slot
    if (com.config.props && com.config.props.value !== undefined) {
      configJson.config.on.input = (e: any) => {
        com.config.props.value = e
      }
    }
    if (configJson.stopPropagation) {
      configJson.config.nativeOn.click = (e: any) => {
        editorBus.$emit(`SELECT_COM_${configJson.id}`)
      }
    }
    delete configJson.config.style
    configJson.config.ref = `ref-${this.comInfo.id}`
    if (com.name === 'qiun-data-charts') {// uni-app 不支持 $attrs
      resolveChartData(com, configJson)
    }
    return h(com.name, comJson.config, ((typeof com.child === 'string') || com.child === null || com.child === undefined)? [configJson.child]: this.resolveComponentChild(com, h, false))
  }
}
</script>

<style scoped lang="scss">

</style>
