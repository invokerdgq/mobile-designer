<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { resolvePagesChange } from '@/utils/area/page'
import { Getter, Action } from 'vuex-class'
import { resolveConfigStyle } from '@/utils/area/formateComponent'

@Component({})
export default class CustomPage extends Vue {
  @Getter('pageInfo') pageInfo!: any
  @Action('setPageInfo') setPageInfo!: any
  @Prop({ default: true }) isEdit!: boolean

  created (this: any) {
    resolvePagesChange.apply(this, [this.pageInfo, true])
  }

  render (h: any) {
    let style = JSON.parse(JSON.stringify(this.pageInfo.config.style))
    resolveConfigStyle(style)
    return h('Page', {
      props:  Object.assign({
        isQuit: true,
        isEntry: false,
        isTabBar: true,
        tabBarIndex: 0
        // @ts-ignore
      }, window.__uniConfig.globalStyle, {
        "navigationBarTitleText": "uni-app"
      }),
      style: { transform: `translate(0px, 0px)`,  overflow: 'hidden', borderRadius: this.isEdit ? '45px': 0}
    }, [h(`pages-custom-${this.pageInfo.route}`, {
      slot: 'page',
      style: { overflow: 'auto', borderRadius: this.isEdit ? '45px': 0, ...style }
    })])
  }
}
</script>

<style scoped>

</style>
