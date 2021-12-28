<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator'
import Formate from '@/utils/area/formateComponent'
import { Getter } from 'vuex-class'
import MiddleContainer from '@/components/area/middleContainer.vue'
import Inheritance from '@/utils/area/inheritance'
import { editorBus } from '@/utils/area/event/bus'

@Component({
  components: {
    MiddleContainer
  }
})
export default class DraggableContainer extends Mixins(Formate, Inheritance) {
  @Prop() comInfo!: any
  @Prop() customRefs: any
  @Getter('pageInfo') pageInfo!: any
  @Prop({ default: null }) indexInfo!: any
  @Prop({ default: false }) first!: boolean

  resolvePrefixName (h: any): any {
    return function (...arg: any) {
      if (typeof arg[0] === 'string' && arg[0].split('-').length < 2) {
        arg[0] = 'VUni-' + arg[0]
      }
      return h(...arg)
    }
  }

  getContainerStyle (configJson: any) {
    // padding 交给元素处理 margin、border 相关 交给容器处理
    return {
      ...configJson.position,
      ...configJson.config.style,
      padding: 0,
      boxSizing: 'content-box'
    }
  }

  getDragPointCorner (h: any) {// 四个角上的点
    return Array.from({ length: 4 }).map((item: any, index: number) => {
      return h('view', {
        class: `hover-corner-${index}`,
        style: {
          zIndex: 1001
        }
      })
    })
  }

  getDragPointCenter (h: any) {// 四条线上的中心点
    return Array.from({length: 4}).map((item: any, index: number) => {
      return h('view', {
        class: `hover-border-${index}`,
        style: {
          zIndex: 1001
        }
      })
    })
  }

  updated () {
    editorBus.$emit('REMOUNT', this.comInfo.id)
  }

  render (h: any) {
    if (this.first && this.comInfo.parentId) return null
    h = this.resolvePrefixName(h)
    const com = this.comInfo
    const comJson = JSON.parse(JSON.stringify(com))
    let configJson = this.formateComponent(comJson)
    let style = this.getContainerStyle(configJson)
    return h('view', {
      class: `comId-${com.id} ${this.pageInfo.currentComponent ? this.pageInfo.currentComponent.id === com.id ? 'isSelected': this.isParent(com.id) ?'isSelectedParent' : '': ''} com-container-${this.hasSlot(com) && (this.isParent(com.id) || (this.pageInfo.currentComponent && com.id === this.pageInfo.currentComponent.id)) ? 'has': 'normal'}`,
      style,
      nativeOn: {
        click: (e: any) => {
          e.stopPropagation()
          this.pageInfo.setCurrentComponent(com.id)
        },
        mousedown: (e: any) => {
          if (this.hasSlot(com)) {
            this.$emit('setType', 'move')
          }
        }
      }
    },[...(this.pageInfo.currentComponent && this.pageInfo.currentComponent.id === com.id ? [
      ...this.getDragPointCenter(h),
      ...this.getDragPointCorner(h),
    ]: []),
        h(MiddleContainer, {
          props: {
            comInfo: this.comInfo,
            customRefs: this.customRefs,
            pageInfo: this.pageInfo,
            indexInfo: this.indexInfo
          },
          on: {
            setRefs: (id: string, info: any) => {
              this.$emit('setRefs', id, info)
            }
          }
        })
    ])
  }
}
</script>

<style scoped>

</style>
