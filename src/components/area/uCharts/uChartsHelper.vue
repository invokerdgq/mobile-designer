<!--<template>-->
<!--  <qiun-data-charts v-bind="config" :chartData="getData"></qiun-data-charts>-->
<!--  &lt;!&ndash;uni-app 不支持 $attrs&ndash;&gt;-->
<!--</template>-->

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { editorBus } from '@/utils/area/event/bus'


@Component({})
export default class UChartsHelper extends Vue {
  @Prop({ default: {} }) comInfo!: any
  @Prop() pageInfo!: any
  @Prop({ default: {} }) config!: any

  get getData (): any {
    const data = this.comInfo.dataset[this.comInfo.dataset.type]
    const xAxisIndex = data.dimensions.findIndex((item: string) => {
      return item === data.encode.xAxis
    })
    const categories = data.source.map((item: Array<any>) => {
      return item[xAxisIndex]
    })
    const series = [
      {
        name: '测试',
        data: [20, 40, 100, 50]
      }
    ]
    return {
      categories,
      series
    }
  }

  created (this: any) {
    editorBus.$on('POI_CHANGE_STOP', () => {
      this.$nextTick(() => {
        if (this.pageInfo.currentComponent && this.comInfo.id === this.pageInfo.currentComponent.id) {
          this.$refs.charts.resizeHandler && this.$refs.charts.resizeHandler()
        }
      })
    })
  }

  render (h: any) {
    this.config.props.chartData = this.getData
    this.config.ref = 'charts'
    return h('qiun-data-charts', this.config)
  }

}
</script>

<style scoped>

</style>
