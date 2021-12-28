<template>
  <el-card>
    <div slot="header" style="text-align: center">方法调用</div>
    <el-form size="small" label-width="80px">
      <el-form-item label="选择方法">
        <el-select v-model="info.key">
          <el-option
            v-for="item in getMethods"
            :value="item"
            :key="item"
            :label="getLabel(item)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class MethodResolve extends Vue {
  @Prop() info!: any
  @Getter('currentPage') currentPage: any

  get getMethods (): Array<string> {
    return Object.keys(this.currentPage.components[this.info.id].methods || {})
  }

  getLabel (key: string): string {
    return this.currentPage.components[this.info.id].methodsDec[key].label
  }
}
</script>

<style scoped>

</style>
