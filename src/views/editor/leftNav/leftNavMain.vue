<template>
  <el-tabs v-model="active">
    <el-tab-pane name="component" label="组件列表">
      <component-nav></component-nav>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ComponentNav from '@/views/editor/leftNav/componentNav.vue'
import { Action } from 'vuex-class'

@Component({
  components: {
    ComponentNav
  }
})
export default class LeftNavMain extends Vue {
  @Action('addPage') addPage: any
  @Action('setCurrentPage') setCurrentPage: any
  active = 'component'
}
</script>

<style scoped lang="scss">

</style>
