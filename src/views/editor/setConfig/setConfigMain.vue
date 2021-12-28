<template>
  <div style="height: 100%">
    <el-tabs class="my-tabs" v-if="pageInfo && !pageInfo.currentComponent" style="height: 100%">
      <el-tab-pane label="页面样式"><page-style-config/></el-tab-pane>
      <el-tab-pane label="页面数据"><page-data-config/></el-tab-pane>
      <el-tab-pane label="页面事件"><page-action-config/></el-tab-pane>
      <el-tab-pane label="权限">权限设置</el-tab-pane>
    </el-tabs>
    <el-tabs class="my-tabs" v-if="pageInfo && pageInfo.currentComponent" style="height: 100%">
      <el-tab-pane label="组件样式"><component-style-config/></el-tab-pane>
      <el-tab-pane label="组件数据"><component-data-config/></el-tab-pane>
      <el-tab-pane label="组件事件"><component-action-config/></el-tab-pane>
      <el-tab-pane label="权限">权限设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import PageStyleConfig from '@/views/editor/setConfig/page/styleConfig.vue'
import PageActionConfig from '@/views/editor/setConfig/page/actionConfig.vue'
import PageDataConfig from '@/views/editor/setConfig/page/dataConfig.vue'
import ComponentActionConfig from '@/views/editor/setConfig/component/actionConfig.vue'
import ComponentDataConfig from '@/views/editor/setConfig/component/dataConfig.vue'
import ComponentStyleConfig from '@/views/editor/setConfig/component/styleConfig.vue'

@Component({
  components: {
    PageStyleConfig,
    PageActionConfig,
    PageDataConfig,
    ComponentActionConfig,
    ComponentDataConfig,
    ComponentStyleConfig
  }
})
export default class SetConfigMain extends Vue {
  @Getter('pageInfo') pageInfo: any
}
</script>

<style scoped lang="scss">
.my-tabs{
  display: flex;
  flex-direction: column;
}
.my-tabs /deep/ .el-tabs__content{
  flex: 1;
  overflow: auto;
}
</style>
